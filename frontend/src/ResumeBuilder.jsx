import React, { useState, useEffect, useRef } from 'react';
import './ResumeBuilder.css';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = ({ userName }) => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: `Hi 👋 Welcome to <b>PathForge AI Resume Builder</b>.` },
    { role: 'assistant', content: "I'll help you create a professional resume step by step 🚀" },
    { role: 'assistant', content: "First, what is your <b>Full Name</b>?" }
  ]);
  const [resumeData, setResumeData] = useState({
    fullName: userName || '',
    role: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    college: '',
    degree: '',
    specialization: '',
    cgpa: '',
    startYear: '',
    endYear: '',
    skills_programming: '',
    skills_ai: '',
    skills_tools: '',
    projects: '',
    experience: '',
    certifications: '',
    extras: {}, // For optional sections
    style: 'ats'
  });

  const [selectedExtras, setSelectedExtras] = useState([]);
  const [extraStepIndex, setExtraStepIndex] = useState(-1);
  const [isExtraFlow, setIsExtraFlow] = useState(false);
  const [isSelectingExtras, setIsSelectingExtras] = useState(false);
  const [zoom, setZoom] = useState(0.9);
  const [atsScore, setAtsScore] = useState(20);
  const [atsFeedback, setAtsFeedback] = useState([]);

  const scrollRef = useRef(null);

  // --- ATS SCORING ENGINE ---
  const calculateScore = () => {
    let score = 0;
    let feedback = [];

    // 1. Contact Info (10 pts)
    let contactPts = 0;
    if (resumeData.email) contactPts += 2.5;
    if (resumeData.phone) contactPts += 2.5;
    if (resumeData.linkedin) contactPts += 2.5;
    if (resumeData.github) contactPts += 2.5;
    score += contactPts;
    if (contactPts < 10) feedback.push("Add all contact links (LinkedIn, GitHub) to improve reach.");

    // 2. Education (15 pts)
    let eduPts = 0;
    if (resumeData.degree) eduPts += 5;
    if (resumeData.college) eduPts += 5;
    if (resumeData.cgpa) eduPts += 3;
    if (resumeData.startYear && resumeData.endYear) eduPts += 2;
    score += eduPts;
    if (eduPts < 15) feedback.push("Complete your education details for better academic visibility.");

    // 3. Technical Skills (20 pts)
    let skillPts = 0;
    if (resumeData.skills_programming) skillPts += 7;
    if (resumeData.skills_ai) skillPts += 7;
    if (resumeData.skills_tools) skillPts += 6;
    score += skillPts;
    if (skillPts < 20) feedback.push("Add more technical skills to match role requirements.");

    // 4. Projects (25 pts)
    const projectList = resumeData.projects.split('\n\n').filter(p => p.trim() !== '');
    let projPts = Math.min(projectList.length * 8, 25);
    score += projPts;
    if (projPts < 20) feedback.push("Add 2–3 strong projects with tech stacks.");

    // 5. Work Experience (15 pts)
    const expList = resumeData.experience.split('\n\n').filter(e => e.trim() !== '');
    let expPts = Math.min(expList.length * 7.5, 15);
    score += expPts;
    if (expPts < 10) feedback.push("Including internships or work exp adds significant value.");

    // 6. Certifications & Extras (10 pts)
    let extraPts = 0;
    if (resumeData.certifications) extraPts += 5;
    if (Object.keys(resumeData.extras).length > 0) extraPts += 5;
    score += extraPts;

    // 7. Formatting (5 pts)
    score += 5;

    setAtsScore(Math.round(score));
    setAtsFeedback(feedback);
  };

  useEffect(() => {
    calculateScore();
  }, [resumeData]);

  const steps = [
    { key: 'role', question: "What <b>Target Role</b> are you aiming for? (e.g., AI Engineer)", label: "Role" },
    { key: 'email', question: "Got it! What's your <b>Email Address</b>?", label: "Email" },
    { key: 'phone', question: "And your <b>Phone Number</b>?", label: "Phone" },
    { key: 'linkedin', question: "Share your <b>LinkedIn URL</b>.", label: "LinkedIn" },
    { key: 'github', question: "And your <b>GitHub URL</b>.", label: "GitHub" },
    { key: 'college', question: "Which <b>College/University</b> do you attend?", label: "College" },
    { key: 'degree', question: "What <b>Degree</b> are you pursuing? (e.g., B.Tech)", label: "Degree" },
    { key: 'specialization', question: "What is your <b>Specialization</b>? (e.g., Information Technology)", label: "Specialization" },
    { key: 'cgpa', question: "What is your <b>CGPA</b>? (e.g., 9.0/10)", label: "CGPA" },
    { key: 'startYear', question: "When did you <b>Start</b>? (MM YYYY)", label: "Start Date" },
    { key: 'endYear', question: "When is your <b>Expected Graduation</b>? (MM YYYY)", label: "End Date" },
    { 
      key: 'skills_programming', 
      question: "What <b>Programming Languages</b> do you know?", 
      label: "Programming",
      suggestions: ['Python', 'SQL', 'Java', 'C++', 'JavaScript', 'R']
    },
    { 
      key: 'skills_ai', 
      question: "What <b>AI/ML skills</b> or domains are you familiar with?", 
      label: "AI/ML",
      suggestions: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'PyTorch', 'Scikit-learn']
    },
    { 
      key: 'skills_tools', 
      question: "What <b>Tools, Frameworks, or Platforms</b> have you worked with?", 
      label: "Tools",
      suggestions: ['TensorFlow', 'OpenCV', 'Flask', 'Docker', 'AWS', 'GitHub', 'Tableau']
    },
    { key: 'projects', question: "Tell me about your <b>Key Projects</b>. 💡 <i>Include dates for each (e.g., Jan 2024 — Apr 2024).</i>\n\n<b>Format:</b>\nProject Name | Tech Stack | Duration\n• Bullet points on new lines", label: "Projects" },
    { key: 'experience', question: "Any <b>Work Experience / Internships</b>? 💡 <i>Include company, role, and duration.</i>\n\n<b>Format:</b>\nRole | Company | Duration\n• Responsibilities on new lines", label: "Experience" },
    { key: 'certifications', question: "List your <b>Certifications</b>.", label: "Certifications" },
    // Step index for selection will be inserted dynamically
    { key: 'style', question: "Finally, choose your <b>Resume Style</b> below! ✨", label: "Finalize" }
  ];

  const OPTIONAL_SECTIONS = [
    { id: 'hobbies', label: 'Hobbies / Interests', question: 'What are your <b>Hobbies or Interests</b>?' },
    { id: 'achievements', label: 'Achievements', question: 'List your key <b>Achievements or Awards</b>.' },
    { id: 'extracurricular', label: 'Extracurricular Activities', question: 'List your <b>Extracurricular Activities</b>.' },
    { id: 'languages', label: 'Languages Known', question: 'What <b>Languages</b> do you know?' },
    { id: 'volunteer', label: 'Volunteer Experience', question: 'Tell me about your <b>Volunteer Experience</b>.' },
    { id: 'publications', label: 'Publications', question: 'Do you have any <b>Publications</b>?' },
    { id: 'research', label: 'Research Papers', question: 'Do you have any <b>Research Papers</b>?' },
    { id: 'coding', label: 'Competitive Coding', question: 'Add your <b>Competitive Coding</b> profiles or achievements (LeetCode, etc).' },
    { id: 'hackathons', label: 'Hackathons', question: 'List the <b>Hackathons</b> you participated in.' },
    { id: 'workshops', label: 'Workshops / Seminars', question: 'List any <b>Workshops or Seminars</b> attended.' },
    { id: 'portfolio', label: 'Portfolio Website', question: 'Share your <b>Portfolio/Personal Website URL</b>.' },
    { id: 'strengths', label: 'Strengths', question: 'What are your key <b>Professional Strengths</b>?' },
    { id: 'custom', label: 'Custom Section', question: 'Enter the <b>Content</b> for your custom section.' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const getSuggestions = (key) => {
    const role = resumeData.role?.toLowerCase() || '';
    if (key === 'skills_programming') {
      if (role.includes('data')) return ['Python', 'SQL', 'R', 'Julia', 'Scala'];
      if (role.includes('ai') || role.includes('ml')) return ['Python', 'C++', 'Java', 'Julia', 'Mojo'];
      return ['JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'Rust'];
    }
    if (key === 'skills_ai') {
      if (role.includes('data')) return ['Statistics', 'Machine Learning', 'Data Visualization', 'Pandas', 'Matplotlib'];
      if (role.includes('ai') || role.includes('ml')) return ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'PyTorch', 'TensorFlow'];
      return ['Generative AI', 'Prompt Engineering', 'LLMs', 'Vector Databases'];
    }
    if (key === 'skills_tools') {
      if (role.includes('data')) return ['Power BI', 'Tableau', 'Excel', 'SQL Server', 'Airflow'];
      if (role.includes('ai') || role.includes('ml')) return ['OpenCV', 'Hugging Face', 'Weights & Biases', 'CUDA', 'Docker', 'Kubernetes'];
      return ['Git', 'VS Code', 'Postman', 'Jira', 'Figma'];
    }
    // Suggestions for Optional Sections
    if (key === 'hobbies') return ['Reading Tech Blogs', 'Chess', 'AI Research', 'Photography', 'Problem Solving', 'Gaming'];
    if (key === 'languages') return ['English', 'Hindi', 'Telugu', 'Spanish', 'German', 'French'];
    if (key === 'certifications') return ['AWS Certified', 'Google Cloud', 'Coursera', 'DeepLearning.AI', 'HackerRank'];
    if (key === 'achievements') return ['Hackathon Finalist', 'Top 5% on LeetCode', 'Merit Scholarship', 'Project of the Year'];
    if (key === 'hackathons') return ['Smart India Hackathon', 'Google HashCode', 'Major League Hacking', 'College TechFest'];
    if (key === 'strengths') return ['Analytical Thinking', 'Team Leadership', 'Fast Learner', 'Problem Solving'];
    return null;
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || step > steps.length) return;

    const newUserMsg = { role: 'user', content: inputValue };
    setChatMessages(prev => [...prev, newUserMsg]);
    
    if (isExtraFlow) {
        const fieldKey = selectedExtras[extraStepIndex] ? OPTIONAL_SECTIONS.find(s => s.id === selectedExtras[extraStepIndex])?.id : undefined;
        if (fieldKey) {
          setResumeData(prev => ({
            ...prev,
            extras: { ...prev.extras, [fieldKey]: inputValue }
          }));
        }
    } else {
      const fieldKey = step === 0 ? 'fullName' : steps[step - 1].key;
      
      // Mandatory Validation for Skills
      if (['skills_programming', 'skills_ai', 'skills_tools'].includes(fieldKey)) {
        if (inputValue.trim().split(',').length < 2) {
          setChatMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "⚠️ Please list at least <b>2–3 skills</b> for this category to ensure a strong ATS score." 
          }]);
          return;
        }
      }
      
      setResumeData(prev => ({ ...prev, [fieldKey]: inputValue }));
    }
    
    setInputValue('');

    setTimeout(() => {
      // Logic for transition after base steps
      if (!isExtraFlow && step === steps.length - 1) {
        setIsSelectingExtras(true);
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Would you like to add any <b>Additional Sections</b> to your resume? (Optional)",
          type: 'selection'
        }]);
        return;
      }

      // Logic for transitioning between extra sections
      if (isExtraFlow) {
        if (extraStepIndex < selectedExtras.length - 1) {
          const nextIndex = extraStepIndex + 1;
          setExtraStepIndex(nextIndex);
          const nextSection = OPTIONAL_SECTIONS.find(s => s.id === selectedExtras[nextIndex]);
          setChatMessages(prev => [...prev, { 
            role: 'assistant', 
            content: nextSection.question,
            suggestions: getSuggestions(nextSection.id)
          }]);
        } else {
          setIsExtraFlow(false);
          setChatMessages(prev => [...prev, { role: 'assistant', content: steps[steps.length - 1].question }]);
          setStep(steps.length);
        }
        return;
      }

      // Base steps flow
      if (step < steps.length) {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: steps[step].question,
          suggestions: getSuggestions(steps[step].key)
        }]);
        setStep(prev => prev + 1);

        // Smart AI Guidance for Projects
        if (fieldKey === 'projects') {
          const projectCount = inputValue.split('\n\n').filter(p => p.trim() !== '').length;
          if (projectCount === 1) {
            setTimeout(() => {
              setChatMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "💡 <b>AI Tip:</b> Adding 1–2 more strong projects can improve your resume strength and ATS score." 
              }]);
            }, 500);
          }
        }
      }
    }, 1000);
  };

  const handleZoom = (delta) => {
    setZoom(prev => {
      const next = prev + delta;
      return Math.min(Math.max(next, 0.5), 2.0);
    });
  };

  const resetZoom = () => setZoom(0.9);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          handleZoom(0.1);
        } else if (e.key === '-') {
          e.preventDefault();
          handleZoom(-0.1);
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleConfirmExtras = () => {
    setIsSelectingExtras(false);
    if (selectedExtras.length > 0) {
      setIsExtraFlow(true);
      setExtraStepIndex(0);
      const firstSection = OPTIONAL_SECTIONS.find(s => s.id === selectedExtras[0]);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: firstSection.question,
        suggestions: getSuggestions(firstSection.id)
      }]);
    } else {
      setChatMessages(prev => [...prev, { role: 'assistant', content: steps[steps.length - 1].question }]);
      setStep(steps.length);
    }
  };

  const toggleExtra = (id) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    const element = document.getElementById('resume-preview-content');
    const nameForFile = (resumeData.fullName || 'Candidate').trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('_');
    const options = {
      margin: 0,
      filename: `${nameForFile}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  const renderResume = () => {
    const { style, fullName, role, email, phone, college, degree, specialization, cgpa, startYear, endYear, skills_programming, skills_ai, skills_tools, projects, experience, certifications, extras } = resumeData;

    if (style === 'ats') {
      const cleanMarkdown = (text) => {
        if (!text) return '';
        return text.replace(/\*\*/g, '').trim();
      };

      const parseBullets = (text) => {
        if (!text) return [];
        return text.split('\n').filter(line => line.trim() !== '').map(line => {
          let clean = line.trim();
          if (clean.startsWith('•') || clean.startsWith('-') || clean.startsWith('*')) {
            clean = clean.substring(1).trim();
          }
          return cleanMarkdown(clean);
        });
      };

      const projectLines = parseBullets(projects);
      const experienceLines = parseBullets(experience);
      const certificationLines = parseBullets(certifications || '');

      return (
        <div className="resume-content ats-style" id="resume-preview-content" style={{ padding: '12mm 15mm', color: '#000', backgroundColor: '#fff', textAlign: 'left', minHeight: '297mm', boxSizing: 'border-box' }}>
          {/* HEADER SECTION */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h1 style={{ fontSize: '24pt', margin: '0 0 2px 0', fontWeight: 'bold', color: '#000', fontFamily: 'serif', textTransform: 'uppercase' }}>
              {cleanMarkdown(fullName) || 'Somya Kar'}
            </h1>
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', marginBottom: '6px' }}>
              {cleanMarkdown(role) || 'AI Engineer | Data Scientist'}
            </div>
            <div style={{ 
              fontSize: '10pt', 
              color: '#000', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '10px', 
              flexWrap: 'wrap', 
              fontWeight: '500' 
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📧 {cleanMarkdown(email) || 'somya.kar@gmail.com'}</span>
              <span>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📞 {cleanMarkdown(phone) || '+91 9876543210'}</span>
              <span>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔗 LinkedIn</span>
              <span>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>💻 GitHub</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '8px 0 0 0' }} />
          </div>

          {/* EDUCATION SECTION */}
          <div className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
              EDUCATION
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px', fontSize: '10.5pt' }}>
              <strong>{cleanMarkdown(degree) || 'Bachelor of Technology (B.Tech)'}</strong>
              <strong>{cleanMarkdown(startYear) || '2022'} — {cleanMarkdown(endYear) || '2026'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt' }}>
              <span>{cleanMarkdown(specialization) || 'Information Technology – Artificial Intelligence'}</span>
              <span>{cleanMarkdown(college) || 'Silicon University'}</span>
            </div>
            <div style={{ fontSize: '10pt', marginTop: '1px' }}>
              <strong>CGPA: {cleanMarkdown(cgpa) || '9.0/10'}</strong>
            </div>
          </div>

          {/* TECHNICAL SKILLS SECTION */}
          <div className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
              TECHNICAL SKILLS
            </div>
            <div style={{ fontSize: '10pt', lineHeight: '1.3' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div><strong>Programming:</strong> {cleanMarkdown(skills_programming) || 'Python, SQL, Java'}</div>
                <div><strong>AI/ML:</strong> {cleanMarkdown(skills_ai) || 'Machine Learning, Deep Learning, NLP, Computer Vision'}</div>
                <div><strong>Tools:</strong> {cleanMarkdown(skills_tools) || 'TensorFlow, OpenCV, Flask, Power BI, GitHub'}</div>
              </div>
            </div>
          </div>

          {/* PROJECTS SECTION */}
          <div className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
              PROJECTS
            </div>
            {projects ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {projects.split('\n\n').map((proj, i) => {
                  const lines = proj.split('\n');
                  const firstLine = lines[0] || '';
                  const bullets = lines.slice(1);
                  
                  // Flexible parsing: Title | Tech | Date
                  const parts = firstLine.split('|').map(p => p.trim());
                  const title = parts[0] || 'Project Name';
                  const tech = parts[1] || '';
                  const date = parts[2] || '';

                  return (
                    <div key={i} style={{ marginBottom: '2px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '11pt', display: 'flex', justifyContent: 'space-between', color: '#000' }}>
                        <span>{cleanMarkdown(title)}{tech ? ` | ${cleanMarkdown(tech)}` : ''}</span>
                        <span style={{ fontSize: '9pt', fontWeight: 'normal' }}>{cleanMarkdown(date)}</span>
                      </div>
                      <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25', color: '#000' }}>
                        {bullets.map((b, j) => <li key={j} style={{ marginBottom: '1px' }}>{cleanMarkdown(b)}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Hate Speech Detection System | Python, NLP, TensorFlow</span>
                    <span>MM YYYY</span>
                  </div>
                  <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25' }}>
                    <li>Developed NLP-based classification system</li>
                    <li>Used deep learning for toxic content detection</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* WORK EXPERIENCE SECTION */}
          <div className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
              WORK EXPERIENCE
            </div>
            {experience ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {experience.split('\n\n').map((exp, i) => {
                  const lines = exp.split('\n');
                  const firstLine = lines[0] || '';
                  const bullets = lines.slice(1);

                  // Flexible parsing: Role | Company | Duration
                  const parts = firstLine.split('|').map(p => p.trim());
                  const roleName = parts[0] || 'Role';
                  const company = parts[1] || '';
                  const duration = parts[2] || '';

                  return (
                    <div key={i}>
                      <div style={{ fontWeight: 'bold', fontSize: '11pt', display: 'flex', justifyContent: 'space-between', color: '#000' }}>
                        <span>{cleanMarkdown(roleName)}{company ? ` | ${cleanMarkdown(company)}` : ''}</span>
                        <span style={{ fontSize: '9pt', fontWeight: 'normal' }}>{cleanMarkdown(duration)}</span>
                      </div>
                      <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25', color: '#000' }}>
                        {bullets.map((b, j) => <li key={j} style={{ marginBottom: '1px' }}>{cleanMarkdown(b)}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '11pt', display: 'flex', justifyContent: 'space-between' }}>
                  <span>AI Intern | XYZ Company</span>
                  <span>Jan 2025 — Mar 2025</span>
                </div>
                <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25' }}>
                  <li>Built ML pipelines</li>
                  <li>Worked on data preprocessing</li>
                </ul>
              </div>
            )}
          </div>

          {/* CERTIFICATIONS SECTION */}
          <div className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
              CERTIFICATIONS
            </div>
            <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25', color: '#000' }}>
              {certificationLines.length > 0 ? (
                certificationLines.map((c, i) => <li key={i} style={{ marginBottom: '1px' }}>{cleanMarkdown(c)}</li>)
              ) : (
                <>
                  <li>Machine Learning — Coursera</li>
                  <li>Deep Learning — DeepLearning.AI</li>
                </>
              )}
            </ul>
          </div>

          {/* DYNAMIC EXTRA SECTIONS */}
          {Object.entries(extras).map(([key, value]) => {
            if (!value) return null;
            const sectionConfig = OPTIONAL_SECTIONS.find(s => s.id === key);
            const sectionTitle = sectionConfig ? sectionConfig.label : key;
            const lines = parseBullets(value);

            return (
              <div key={key} className="resume-section-ats" style={{ marginTop: '12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '1.5px solid #000', marginBottom: '6px', paddingBottom: '1px' }}>
                  {sectionTitle}
                </div>
                <ul style={{ margin: '2px 0 0 18px', padding: 0, fontSize: '10pt', lineHeight: '1.25', color: '#000' }}>
                  {lines.map((l, idx) => <li key={idx} style={{ marginBottom: '1px' }}>{l}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }

    return <div className="resume-placeholder">Select a style to preview</div>;
  };

  return (
    <div className="resume-builder-container">
      <div className="builder-chat-panel">
        <div className="builder-header">
          <h2>Resume Assistant</h2>
          <div className="step-count">
            {isExtraFlow ? `Extra Step ${extraStepIndex + 1} of ${selectedExtras.length}` : isSelectingExtras ? "Customization" : `Step ${step + 1} of ${steps.length}`}
          </div>
        </div>
        
        <div className="progress-tracker">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${(step / steps.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="chat-messages-scroll" ref={scrollRef}>
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role}`}>
              <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.content }}></div>
              
              {/* Context-Aware Suggestions */}
              {msg.suggestions && idx === chatMessages.length - 1 && msg.role === 'assistant' && (
                <div className="suggestions-row">
                  {msg.suggestions.map(s => (
                    <button key={s} className="suggestion-pill" onClick={() => setInputValue(prev => {
                      const skills = prev.split(',').map(x => x.trim()).filter(x => x);
                      if (skills.includes(s)) return prev;
                      return skills.length > 0 ? `${prev}, ${s}` : s;
                    })}>
                      + {s}
                    </button>
                  ))}
                </div>
              )}
              {msg.type === 'selection' && (
                <div className="selection-grid-container">
                  <div className="selection-grid">
                    {OPTIONAL_SECTIONS.map(section => {
                      const isSuggested = (resumeData.role?.toLowerCase().includes('ai') || resumeData.role?.toLowerCase().includes('ml') || resumeData.role?.toLowerCase().includes('research')) && 
                        ['research', 'publications', 'hackathons'].includes(section.id);
                      
                      return (
                        <button 
                          key={section.id} 
                          className={`selection-chip ${selectedExtras.includes(section.id) ? 'active' : ''} ${isSuggested ? 'suggested' : ''}`}
                          onClick={() => toggleExtra(section.id)}
                        >
                          {section.label}
                          {isSuggested && <span className="suggested-tag">💡</span>}
                        </button>
                      );
                    })}
                  </div>
                  <div className="selection-actions">
                    <button className="btn-skip" onClick={handleConfirmExtras}>Skip All</button>
                    <button className="btn-confirm primary" onClick={handleConfirmExtras}>
                      {selectedExtras.length > 0 ? `Add ${selectedExtras.length} Sections` : 'Continue'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="builder-input-area">
          <form onSubmit={handleSend} className="chat-input-wrapper">
            <textarea 
              className="chat-textarea"
              placeholder="Type your answer here..." 
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                  e.target.style.height = 'auto';
                }
              }}
              disabled={step >= steps.length}
              rows={1}
            />
            <button type="submit" className="btn-preview primary send-btn" disabled={step >= steps.length}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px' }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      </div>

      <div className="builder-preview-panel">
        <div className="preview-controls">
          <div className="control-group">
            <span className="live-badge">LIVE PREVIEW</span>
            <div className={`ats-meter-premium ${atsScore > 80 ? 'excellent' : atsScore > 60 ? 'strong' : 'moderate'}`}>
              <div className="ats-score-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" style={{ strokeDasharray: `${atsScore}, 100` }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="score-text">{atsScore}</span>
              </div>
              <div className="ats-label-group">
                <span className="ats-label">ATS Score</span>
                <span className="ats-strength">
                  {atsScore > 90 ? 'Excellent ✨' : atsScore > 75 ? 'Strong 💪' : atsScore > 50 ? 'Moderate 📈' : 'Weak ⚠️'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {atsFeedback.length > 0 && (
          <div className="ats-feedback-floating">
            <h4>💡 Suggestions</h4>
            <ul>
              {atsFeedback.slice(0, 2).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        <div className="preview-toolbar-floating">
          <div className="zoom-display">
            {Math.round(zoom * 100)}%
          </div>
          <button className="btn-toolbar" onClick={() => handleZoom(0.1)} title="Zoom In">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <button className="btn-toolbar" onClick={() => handleZoom(-0.1)} title="Zoom Out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <button className="btn-toolbar" onClick={resetZoom} title="Fit to Screen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
          </button>
          <div className="toolbar-divider"></div>
          <button className="btn-toolbar" onClick={() => window.print()} title="Print">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>
          </button>
          <button className="btn-toolbar primary" onClick={handleDownload} title="Download PDF">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
        </div>


        <div className="preview-viewport" onWheel={(e) => {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
          }
        }}>
          <div className="resume-paper-container">
            <div className="resume-paper" style={{ transform: `scale(${zoom})` }}>
              {renderResume()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

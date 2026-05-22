import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Paperclip, Mic, MicOff, Sun, Moon, 
  Sparkles, BookOpen, ChevronRight, Copy, Check, Volume2, 
  VolumeX, Trophy, ShieldAlert, Award, Calendar, HelpCircle, 
  User, CheckCircle, Brain, Star
} from 'lucide-react';
import './InterviewPrep.css';

// SVG Icon Helper for Left Sidebar categories
const getCategoryIcon = (name) => {
  switch (name) {
    case 'Common Questions':
    case 'Tell Me About Yourself':
    case 'Strengths & Weaknesses':
      return <User className="category-icon" size={16} />;
    case 'HR Questions Bank':
    case 'Resume Based Q&A':
      return (
        <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 'DSA Questions':
    case 'Coding Questions':
      return (
        <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'System Design':
      return (
        <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      );
    case 'OOPs Concepts':
    case 'Database (SQL)':
      return (
        <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case 'Operating Systems':
    case 'Computer Networks':
      return (
        <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'Leadership':
    case 'Teamwork':
    case 'Problem Solving':
    case 'Adaptability':
    case 'Work Ethic':
      return <Brain className="category-icon" size={16} />;
    default:
      return <HelpCircle className="category-icon" size={16} />;
  }
};

// SVG Overall score circular gauge (72%)
const CircularScoreGauge = ({ score }) => {
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="score-gauge-wrapper">
      <svg className="circular-gauge-svg" width="94" height="94" viewBox="0 0 94 94">
        {/* Track circle */}
        <circle 
          className="gauge-track" 
          cx="47" 
          cy="47" 
          r={radius} 
          stroke="rgba(99, 102, 241, 0.08)" 
          strokeWidth={strokeWidth} 
          fill="none" 
        />
        {/* Fill circle */}
        <circle 
          className="gauge-fill" 
          cx="47" 
          cy="47" 
          r={radius} 
          stroke="url(#gaugeGradient)" 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" 
          fill="none" 
          transform="rotate(-90 47 47)" 
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="gauge-overlay-text">
        <span className="gauge-percent">{score}%</span>
        <span className="gauge-label">Overall Score</span>
      </div>
    </div>
  );
};

// Clean helper to parse structured sections inside Interview bubbles
const parseInterviewBubble = (text, messageIndex, speakingMsgId, toggleSpeak) => {
  if (!text) return null;

  // Render bullet points, bold markers, and highlight specific structures
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold items **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Custom code or highlights `text`
  formatted = formatted.replace(/`(.*?)`/g, '<code class="inline-interview-tag">$1</code>');

  const lines = formatted.split('\n');
  const elements = [];

  let inStructureList = false;
  let inSampleAnswer = false;

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('Structure:')) {
      elements.push(<h4 key={`h4-struct-${idx}`} className="bubble-section-heading">Structure:</h4>);
      inStructureList = true;
      inSampleAnswer = false;
    } else if (trimmed.startsWith('Sample Answer:')) {
      elements.push(<h4 key={`h4-sample-${idx}`} className="bubble-section-heading">Sample Answer:</h4>);
      inStructureList = false;
      inSampleAnswer = true;
    } else if (trimmed.startsWith('Tips to Answer')) {
      elements.push(<h3 key={`h3-tips-${idx}`} className="bubble-section-main-title">{line.replace(/<strong>|<\/strong>/g, '')}</h3>);
    } else if (inStructureList && trimmed.startsWith('-')) {
      elements.push(
        <div key={`struct-li-${idx}`} className="structure-list-item">
          <span className="struct-bullet">✦</span>
          <span dangerouslySetInnerHTML={{ __html: trimmed.slice(1).trim() }} />
        </div>
      );
    } else if (inSampleAnswer && (trimmed.startsWith('"') || trimmed.startsWith('“') || trimmed.length > 2)) {
      elements.push(
        <blockquote key={`quote-${idx}`} className="sample-answer-quote" dangerouslySetInnerHTML={{ __html: line }} />
      );
    } else if (trimmed) {
      elements.push(<p key={`p-${idx}`} className="bubble-normal-p" dangerouslySetInnerHTML={{ __html: line }} />);
    }
  });

  return (
    <div className="bubble-parsed-container">
      {elements}
      
      {/* Listen & Copy audio bar within bot message bubble */}
      <div className="bubble-actions-row">
        <button 
          className={`bubble-action-btn ${speakingMsgId === messageIndex ? 'speaking' : ''}`}
          onClick={() => toggleSpeak(text, messageIndex)}
        >
          {speakingMsgId === messageIndex ? <VolumeX size={13} /> : <Volume2 size={13} />}
          <span>{speakingMsgId === messageIndex ? 'Stop' : 'Listen'}</span>
        </button>
        <button 
          className="bubble-action-btn"
          onClick={() => {
            navigator.clipboard.writeText(text.replace(/\*\*|#|`/g, ''));
          }}
        >
          <Copy size={13} />
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
};

const InterviewPrep = ({ setCurrentView, theme, setTheme }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `👋 **Welcome to Interview Prep!**\nI can help you with HR questions, technical concepts, behavioral questions, and mock interviews.\nHow can I assist you today?`,
      time: '10:30 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Common Questions');
  
  // Voice Recording / Speech Synthesis States
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const synthRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);
  const textInputRef = useRef(null);

  // Scroll
  const chatBottomRef = useRef(null);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  // Set up SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? prev + ' ' + transcript : transcript));
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      // Speech recognition not supported or denied, simulate voice typing
      if (isRecording) {
        setIsRecording(false);
      } else {
        setIsRecording(true);
        setTimeout(() => {
          setInput(prev => (prev ? prev + ' ' + 'Tell me about yourself.' : 'Tell me about yourself.'));
          setIsRecording(false);
        }, 1500);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      synthRef.current?.cancel();
      setSpeakingMsgId(null);
      recognitionRef.current.start();
    }
  };

  const toggleSpeak = (text, index) => {
    if (!synthRef.current) return;

    if (speakingMsgId === index) {
      synthRef.current.cancel();
      setSpeakingMsgId(null);
    } else {
      synthRef.current.cancel();
      // Clean up markdown before speaking
      const utteranceText = text
        .replace(/\*\*|#|`/g, '')
        .replace(/Structure:|Sample Answer:|💡 Quick Tip/g, '');
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.onend = () => {
        setSpeakingMsgId(null);
      };
      utterance.onerror = () => {
        setSpeakingMsgId(null);
      };
      setSpeakingMsgId(index);
      synthRef.current.speak(utterance);
    }
  };

  const handleSend = async (forcedText = '') => {
    const textToSend = forcedText.trim() || input.trim();
    if (!textToSend) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: textToSend, time: currentTime };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Cancel speech when sending new message
    synthRef.current?.cancel();
    setSpeakingMsgId(null);

    // Fetch API
    try {
      const response = await fetch('http://127.0.0.1:5000/api/placement-prep/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      const data = await response.json();
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.ok && data.response) {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: data.response, 
          time: botTime,
          hasSuggestions: true
        }]);
      } else {
        throw new Error("Server response error");
      }
    } catch (e) {
      console.warn("Backend API failed, falling back to simulated Interview response:", e);
      setTimeout(() => {
        const reply = generateMockInterviewReply(textToSend);
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: reply, 
          time: botTime,
          hasSuggestions: true
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    setIsLoading(false);
  };

  const generateMockInterviewReply = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('tell me about yourself')) {
      return `Tips to Answer - Tell me about yourself\nThis is an ice-breaker question. Keep your answer short, professional and relevant to the role.\n\nStructure:\n- Present – Your current role/skills\n- Past – Your experience/education\n- Future – Your goals and how this role fits\n\nSample Answer:\n"I am a final year computer science student with strong problem-solving skills and a passion for software development. I have experience in building projects using Python, JavaScript, and SQL. I enjoy solving DSA problems and building scalable applications. I am excited about opportunities where I can learn, contribute, and grow as a developer."`;
    }

    if (q.includes('strength') || q.includes('weakness')) {
      return `Tips to Answer - Strengths & Weaknesses\nWhen discussing strengths, be honest and align them with the job. For weaknesses, pick a real but fixable one and explain how you are working on it.\n\nStructure:\n- Strength: Provide concrete evidence (e.g. "My strength is adaptibility. During my last team project...")\n- Weakness: Describe the skill gap and active self-improvement (e.g. "I used to struggle with public speaking, so I joined a debate club...")\n\nSample Answer:\n"My greatest strength is my analytical thinking; I love breaking down complex coding bugs. My weakness has been public speaking, which is why I've recently started leading developer standups to build my confidence."`;
    }

    if (q.includes('mock interview') || q.includes('practice hr') || q.includes('technical mock')) {
      return `### AI Mock Interview Session\nLet's start your mock interview! I will act as the interviewer. Please answer using the STAR format (Situation, Task, Action, Result).\n\nHere is your first question:\n"Tell me about a time you had to work under tight deadline pressures. How did you manage it?"`;
    }

    return `I am your AI Interview Coach. I can help you with:\n- Structuring answers to common HR questions (\`${selectedTopic}\` is active)\n- Reviewing coding, databases, and network architectures\n- Performing AI feedback audits\n\nAsk me any question or request a mock interview using the toolbar options!`;
  };

  const handleCategorySelect = (topic) => {
    setSelectedTopic(topic);
    setInput(`Give me answer guidelines, structure, and a sample response for the interview topic: **${topic}**.`);
    textInputRef.current?.focus();
  };

  const handleTopicPrompt = (promptText) => {
    handleSend(promptText);
  };

  const hrInterviewList = [
    'Common Questions', 'Tell Me About Yourself', 'Strengths & Weaknesses', 'HR Questions Bank', 'Resume Based Q&A'
  ];

  const technicalInterviewList = [
    'DSA Questions', 'System Design', 'OOPs Concepts', 'Database (SQL)', 'Operating Systems', 'Computer Networks', 'Coding Questions'
  ];

  const behavioralInterviewList = [
    'Leadership', 'Teamwork', 'Problem Solving', 'Adaptability', 'Work Ethic'
  ];

  const practiceToolsList = [
    { name: 'Mock Interview', badge: 'New' },
    { name: 'AI Feedback', badge: null },
    { name: 'Interview Tips', badge: null },
    { name: 'Do\'s & Don\'ts', badge: null },
    { name: 'Company Questions', badge: null }
  ];

  const interviewPracticeList = [
    { title: 'HR Mock Interview', desc: 'Practice HR round with AI' },
    { title: 'Technical Mock Interview', desc: 'Practice technical questions' },
    { title: 'Mixed Mock Interview', desc: 'HR + Technical + Behavioral' }
  ];

  const recentMockInterviewsList = [
    { title: 'Software Engineer - HR Round', date: 'May 20, 2024', score: 78, class: 'green' },
    { title: 'SDE - Technical Round', date: 'May 18, 2024', score: 82, class: 'green' },
    { title: 'SDE - Mixed Round', date: 'May 15, 2024', score: 68, class: 'orange' }
  ];

  const quickTipsList = [
    'Be confident and honest',
    'Give structured answers',
    'Use examples from experience',
    'Stay calm and think before answering'
  ];

  return (
    <div className="interview-prep-container">
      {/* LEFT PANEL: CATEGORIES & SELECTION SIDEBAR */}
      <aside className="workspace-left-sidebar">
        <button className="back-btn-premium" onClick={() => setCurrentView('placement-prep')}>
          <ArrowLeft size={16} />
          <span>Back to Modules</span>
        </button>

        <div className="sidebar-scrollable-content">
          {/* HR Interview */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">HR INTERVIEW</span>
            <div className="sidebar-items-list">
              {hrInterviewList.map((topic) => (
                <button
                  key={topic}
                  className={`sidebar-item-btn ${selectedTopic === topic ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(topic)}
                >
                  {getCategoryIcon(topic)}
                  <span className="item-label">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Technical Interview */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">TECHNICAL INTERVIEW</span>
            <div className="sidebar-items-list">
              {technicalInterviewList.map((topic) => (
                <button
                  key={topic}
                  className={`sidebar-item-btn ${selectedTopic === topic ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(topic)}
                >
                  {getCategoryIcon(topic)}
                  <span className="item-label">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Behavioral Interview */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">BEHAVIORAL INTERVIEW</span>
            <div className="sidebar-items-list">
              {behavioralInterviewList.map((topic) => (
                <button
                  key={topic}
                  className={`sidebar-item-btn ${selectedTopic === topic ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(topic)}
                >
                  {getCategoryIcon(topic)}
                  <span className="item-label">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Practice & Tools */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">PRACTICE & TOOLS</span>
            <div className="sidebar-items-list">
              {practiceToolsList.map((tool) => (
                <button
                  key={tool.name}
                  className={`sidebar-item-btn ${selectedTopic === tool.name ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(tool.name)}
                >
                  <Calendar size={15} />
                  <span className="item-label">{tool.name}</span>
                  {tool.badge && <span className="premium-sidebar-badge">{tool.badge}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MIDDLE PANEL: MAIN AI WORKSPACE */}
      <main className="workspace-center-panel">
        <header className="workspace-header">
          <div className="header-titles">
            <span className="category-tag">INTERVIEW PREP</span>
            <h1 className="header-main-title">AI Interview Assistant</h1>
            <p className="header-subtitle">Prepare for HR, Technical, and Behavioral interviews with AI guidance and mock practice.</p>
          </div>
          
          <div className="theme-toggle-container">
            <button 
              className={`theme-toggle-pill ${theme}`} 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title="Toggle Theme"
            >
              <div className="theme-knob">
                {theme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
              </div>
              <span className="toggle-label-sun">☀️</span>
              <span className="toggle-label-moon">🌙</span>
            </button>
          </div>
        </header>

        {/* Floating background graphics */}
        <div className="floating-decorations">
          <div className="decor-glow-purple"></div>
          <span className="decor-icon icon-1">💬</span>
          <span className="decor-icon icon-2">?</span>
          <span className="decor-icon icon-3">👤</span>
          <span className="decor-icon icon-4">⚙️</span>
          <span className="decor-icon icon-5">✓</span>
          <span className="decor-icon icon-6">★</span>
        </div>

        {/* Chat History Container */}
        <div className="chat-history-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="message-avatar bot">
                  <div className="avatar-circle purple-gradient">
                    <Sparkles size={16} />
                  </div>
                </div>
              )}
              
              <div className="bubble-wrapper-suggestions">
                <div className={`message-bubble ${msg.sender}`}>
                  <div className="bubble-content">
                    {msg.sender === 'bot' ? (
                      parseInterviewBubble(msg.text, index, speakingMsgId, toggleSpeak)
                    ) : (
                      msg.text
                    )}
                  </div>
                  {msg.time && <span className="bubble-time">{msg.time}</span>}
                </div>

                {/* Suggestions row below bot replies */}
                {msg.sender === 'bot' && msg.hasSuggestions && (
                  <div className="followup-suggestions-row">
                    <button className="suggestion-pill-btn" onClick={() => handleTopicPrompt(`Give me a common HR Question to practice.`)}>HR Question</button>
                    <button className="suggestion-pill-btn" onClick={() => handleTopicPrompt(`Give me a Technical Question to practice.`)}>Technical Question</button>
                    <button className="suggestion-pill-btn" onClick={() => handleTopicPrompt(`Give me a Behavioral Question to practice.`)}>Behavioral Question</button>
                    <button className="suggestion-pill-btn active-pill" onClick={() => handleTopicPrompt(`Let's start a Mock Interview now.`)}>Mock Interview</button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="message-avatar user">
                  <div className="avatar-circle user-circle">
                    {localStorage.getItem('chat_user_name')?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-row bot">
              <div className="message-avatar bot">
                <div className="avatar-circle purple-gradient loading-spin">
                  <Volume2 size={16} />
                </div>
              </div>
              <div className="message-bubble bot typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* BOTTOM GLASS INPUT CONTAINER */}
        <div className="chat-input-container-glass">
          <textarea
            ref={textInputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask any interview question or request a mock interview..."
            className="workspace-textarea"
          />
          <div className="input-toolbar">
            <div className="toolbar-left-actions">
              <button className="toolbar-btn" title="Attach notes / resume">
                <Paperclip size={18} />
              </button>
              <button 
                className={`toolbar-btn ${isRecording ? 'active-tool recording-glow' : ''}`} 
                onClick={toggleRecording}
                title={isRecording ? "Stop voice transcriber" : "Speak to write response"}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              {isRecording && <span className="recording-status-text">Listening... Speak now</span>}
            </div>
            <button className="send-btn-round" onClick={() => handleSend()} disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL: STATISTICS & TIPS SIDEBAR */}
      <aside className="workspace-right-sidebar">
        {/* Interview Practice card */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Brain size={16} className="title-icon purple-text" />
              <span>Interview Practice</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show all practice topics.")}>View All</button>
          </div>
          <div className="practice-cards-list">
            {interviewPracticeList.map((pr) => (
              <div 
                key={pr.title} 
                className="practice-card-item"
                onClick={() => handleSend(`Let's start the: ${pr.title}`)}
              >
                <div className="practice-item-content">
                  <span className="pr-item-title">{pr.title}</span>
                  <span className="pr-item-desc">{pr.desc}</span>
                </div>
                <ChevronRight size={14} className="pr-arrow-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* Your Progress Overall circular chart */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Trophy size={16} className="title-icon purple-text" />
              <span>Your Progress</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show complete report of my mock interview performance.")}>View Report</button>
          </div>
          
          <div className="progress-columns-flex">
            <CircularScoreGauge score={72} />

            <div className="progress-mini-bar-list">
              {[
                { name: 'HR', pct: 75 },
                { name: 'Technical', pct: 70 },
                { name: 'Behavioral', pct: 68 },
                { name: 'Communication', pct: 76 }
              ].map(item => (
                <div key={item.name} className="mini-bar-item">
                  <div className="mini-bar-row">
                    <span className="mini-name">{item.name}</span>
                    <span className="mini-pct">{item.pct}%</span>
                  </div>
                  <div className="mini-bar-bg">
                    <div className="mini-bar-fill" style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Mock Interviews */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Calendar size={16} className="title-icon purple-text" />
              <span>Recent Mock Interviews</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show my history of mock interviews.")}>View All</button>
          </div>
          <div className="recent-mocks-list">
            {recentMockInterviewsList.map((mock) => (
              <div 
                key={mock.title} 
                className="recent-mock-item"
                onClick={() => handleSend(`Show summary and detailed feedback for mock interview: ${mock.title} taken on ${mock.date}`)}
              >
                <div className="recent-mock-left">
                  <span className="mock-title">{mock.title}</span>
                  <span className="mock-date">{mock.date}</span>
                </div>
                <span className={`mock-score-badge badge-${mock.class}`}>{mock.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Star size={16} className="title-icon purple-text" fill="currentColor" />
              <span>Quick Tips</span>
            </h3>
          </div>
          <div className="quick-tips-list-bullets">
            {quickTipsList.map((tip) => (
              <div key={tip} className="quick-tip-bullet-row" onClick={() => handleSend(`Explain the tip: "${tip}" in more detail.`)}>
                <span className="tip-bullet-icon-wrapper">
                  <CheckCircle size={13} />
                </span>
                <span className="tip-text">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default InterviewPrep;

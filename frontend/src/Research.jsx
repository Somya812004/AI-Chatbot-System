import React, { useState, useEffect } from 'react';
import './Research.css';

const Research = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState('');

  const tabs = [
    { id: 'insights', label: 'Company Insights' },
    { id: 'roles', label: 'Role Explorer' },
    { id: 'trends', label: 'Industry Trends' },
    { id: 'analyzer', label: 'Skill Gap Analyzer' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'guidance', label: 'AI Guidance' }
  ];

  useEffect(() => {
    if (activeTab === 'insights') {
      fetchCompanies();
    }
  }, [activeTab]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/research/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAiGuidance = async () => {
    if (!aiQuery) return;
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/research/ai-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery })
      });
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      setAiResponse('Error getting AI guidance.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillAnalysis = async () => {
    if (!resumeText) return;
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/research/analyze-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, target_role: 'AI Engineer' })
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setAnalysis('Error analyzing skills.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="research-container animate-fade-in">
      <header className="research-header">
        <h1 className="research-title">Career Intelligence Platform</h1>
        <p className="research-subtitle">Explore, Analyze, and Conquer your dream career.</p>
      </header>

      <nav className="feature-nav">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </nav>

      <div className="research-content">
        {activeTab === 'insights' && (
          <div className="research-grid">
            {loading ? <p>Loading companies...</p> : companies.map((company, index) => (
              <div key={index} className="glass-card company-card">
                <div className="company-logo">{company.Company?.[0]}</div>
                <div className="company-name">{company.Company}</div>
                <div className="company-tags">
                  <span className="tag">{company.Industry}</span>
                  <span className="tag">{company.Location}</span>
                </div>
                <button className="view-details-btn">View Intelligence</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="glass-card ai-section">
            <div className="ai-header">
              <svg className="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              <h2>Skill Gap Analyzer</h2>
            </div>
            <textarea 
              className="ai-input" 
              placeholder="Paste your resume content here..." 
              rows="6"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            ></textarea>
            <button className="ai-btn" onClick={handleSkillAnalysis} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze My Skills'}
            </button>
            {analysis && (
              <div className="ai-response-box">
                <h3>Analysis Results</h3>
                <div className="response-content" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }}></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guidance' && (
          <div className="glass-card ai-section">
            <div className="ai-header">
              <svg className="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <h2>AI Career Counselor</h2>
            </div>
            <div className="ai-input-wrapper">
              <input 
                type="text" 
                className="ai-input" 
                placeholder="How do I become a Data Scientist at Google?" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <button className="ai-btn" onClick={handleAiGuidance} disabled={loading}>
                {loading ? 'Consulting...' : 'Ask AI'}
              </button>
            </div>
            {aiResponse && (
              <div className="ai-response-box">
                <h3>Personalized Strategy</h3>
                <div className="response-content" dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br/>') }}></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roles' && (
           <div className="research-grid">
              <div className="glass-card">
                <h3>Software Engineer</h3>
                <p>Demand: High</p>
                <button className="tag">Explore Path</button>
              </div>
              <div className="glass-card">
                <h3>AI Engineer</h3>
                <p>Demand: Very High</p>
                <button className="tag">Explore Path</button>
              </div>
           </div>
        )}

        {activeTab === 'trends' && (
          <div className="glass-card">
            <h2>Industry Trends 2024</h2>
            <ul>
              <li>Generative AI (+300% demand)</li>
              <li>Cybersecurity Resilience</li>
              <li>Green Tech & Sustainability</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;

import React from 'react';
import './PlacementPrep.css';

const PlacementPrep = ({ onSelectMode }) => {
  const stats = [
    { label: 'Problems', value: '1000+', icon: 'code' },
    { label: 'Interviews', value: '500+', icon: 'user-check' },
    { label: 'Success Rate', value: '98%', icon: 'trending-up' },
    { label: 'AI Support', value: '24/7', icon: 'zap' }
  ];

  const modules = [
    {
      id: 'coding',
      title: 'Coding Prep',
      description: 'Master Data Structures & Algorithms with AI-powered code analysis and real-time feedback.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      id: 'aptitude',
      title: 'Aptitude Prep',
      description: 'Sharpen your logical, quantitative, and verbal reasoning skills with curated question sets.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )
    },
    {
      id: 'interview',
      title: 'Interview Prep',
      description: 'Practice with AI-simulated technical and behavioral mock interviews tailored to your target roles.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      description: 'Identify your weaknesses and get a personalized learning roadmap to reach your career goals.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="placement-prep-dashboard">
      <div className="background-decor">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="particles"></div>
      </div>

      <header className="prep-header">
        <span className="section-tag">Placement Preparation</span>
        <div className="hero-section">
          <h1 className="hero-title">
            Crack Your <span className="gradient-highlight">Dream Job</span>
          </h1>
          <p className="hero-subtitle">
            Prepare smarter with AI-powered practice, personalized guidance, and placement analytics.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass-morphism">
            <div className="stat-icon">
              {stat.icon === 'code' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
              {stat.icon === 'user-check' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>}
              {stat.icon === 'trending-up' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>}
              {stat.icon === 'zap' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>}
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="modules-section">
        <h2 className="section-title">Preparation Modules</h2>
        <div className="modules-grid">
          {modules.map((module) => (
            <div key={module.id} className="module-card glass-morphism" onClick={() => onSelectMode(module.id)}>
              <div className="module-icon-box">{module.icon}</div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-desc">{module.description}</p>
              <button className="module-action-btn">
                <span>Get Started</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="plan-section">
        <div className="today-plan-panel glass-morphism light">
          <div className="plan-header">
            <h2 className="panel-title">Today's Plan</h2>
            <span className="date-badge">May 15, 2026</span>
          </div>
          
          <div className="plan-items">
            <div className="plan-item">
              <div className="item-info">
                <span className="item-name">DSA Practice Progress</span>
                <span className="item-percent">75%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '75%', background: 'linear-gradient(90deg, #8b5cf6, #d946ef)' }}></div>
              </div>
            </div>

            <div className="plan-item">
              <div className="item-info">
                <span className="item-name">Mock Interview Status</span>
                <span className="item-status completed">Completed</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '100%', background: '#10b981' }}></div>
              </div>
            </div>

            <div className="plan-item">
              <div className="item-info">
                <span className="item-name">Aptitude Test Progress</span>
                <span className="item-percent">40%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '40%', background: '#3b82f6' }}></div>
              </div>
            </div>

            <div className="plan-item">
              <div className="item-info">
                <span className="item-name">Revision Tracker</span>
                <span className="item-percent">60%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '60%', background: '#f59e0b' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementPrep;

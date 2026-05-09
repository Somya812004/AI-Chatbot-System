import React, { useState } from 'react';
import './PlacementPrep.css';

const PlacementPrep = ({ onSelectMode }) => {
  const [localTheme, setLocalTheme] = useState('dark');

  const toggleTheme = () => {
    setLocalTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const modes = [
    {
      id: 'coding',
      title: 'Coding Prep',
      desc: 'Master DSA & problem solving with AI guidance',
      icon: (
        <div className="icon-cube-3d">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      ),
      color: 'purple'
    },
    {
      id: 'aptitude',
      title: 'Aptitude Prep',
      desc: 'Sharpen quantitative, logical & verbal skills',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'interview',
      title: 'Interview Prep',
      desc: 'Practice HR, behavioral & mock interviews',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
      color: 'cyan'
    }
  ];

  const stats = [
    { label: 'Problems', value: '1000+', icon: (
      <div className="stat-badge purple-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></div>
    )},
    { label: 'Interview Qs', value: '500+', icon: (
      <div className="stat-badge blue-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9H4.5A2.5 2.5 0 0 1 2 6.5v0A2.5 2.5 0 0 1 4.5 4H6m12 5h1.5A2.5 2.5 0 0 0 22 6.5v0A2.5 2.5 0 0 0 19.5 4H18M6 4h12v11c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z"></path></svg></div>
    )},
    { label: 'Success Rate', value: '98%', icon: (
      <div className="stat-badge cyan-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div>
    )}
  ];

  const microMotivations = [
    { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13 0-2.97a2.121 2.121 0 0 0-2.97 0z"/><path d="M15 15l-3.5-3.5"/><path d="M11 2a14 14 0 0 1 11 11L11 2z"/><path d="M22 13s-3.74-.5-5-2c-.71-.84-.71-2.13 0-2.97.84-.71 2.13-.71 2.97 0 1.5 1.26 2 5 2 5z"/><path d="M11 2s-.5 3.74-2 5c-.84.71-2.13.71-2.97 0-.71-.84-.71-2.13 0-2.97.84-.71 4.97-2.03 4.97-2.03z"/></svg>
    ), title: 'Keep Pushing', text: 'Every small step today builds your big future.', color: '#a855f7' },
    { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5A2.5 2.5 0 0 1 2 6.5v0A2.5 2.5 0 0 1 4.5 4H6m12 5h1.5A2.5 2.5 0 0 0 22 6.5v0A2.5 2.5 0 0 0 19.5 4H18M6 4h12v11c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z"></path></svg>
    ), title: 'Stay Consistent', text: 'Consistency is what turns goals into achievements.', color: '#3b82f6' },
    { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    ), title: 'Believe In You', text: 'You are stronger than you think & capable of more.', color: '#facc15' },
    { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
    ), title: 'Track Progress', text: 'Your progress today is your power tomorrow.', color: '#2dd4bf' }
  ];

  return (
    <div className={`prep-container ${localTheme}`}>
      {/* --- TOP RIGHT CONTROLS --- */}
      <div className="top-right-controls">
        <div className="theme-toggle-pill" onClick={toggleTheme}>
          <div className={`theme-icon ${localTheme === 'dark' ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          </div>
          <div className={`theme-icon ${localTheme === 'light' ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </div>
        </div>
      </div>

      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="cosmic-background">
        <div className="nebula-cloud"></div>
        <div className="star-field"></div>
        <div className="galaxy-glow"></div>
      </div>

      <div className="prep-content-wrapper">
        <div className="prep-top-badge-container">
          <div className="prep-glass-badge">PLACEMENT PREPARATION</div>
        </div>

        {/* --- HERO SPLIT --- */}
        <div className="prep-hero-split">
          <div className="hero-left">
            <h1 className="hero-title-main">
              Crack Your <br/>
              <span className="gradient-text">Dream Job,</span>
            </h1>
            <p className="hero-subtitle-sub">Prepare across coding, aptitude, and real interviews</p>
            
            <div className="stats-glass-container">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item-premium">
                  <div className="stat-icon-wrap">{stat.icon}</div>
                  <div className="stat-details">
                    <span className="stat-val">{stat.value}</span>
                    <span className="stat-lab">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="journey-summit-visual">
              <div className="summit-peak"></div>
              <div className="summit-flag-pole"></div>
              <div className="summit-flag">P</div>
              <div className="winding-path"></div>
              <div className="summit-glow"></div>
              <div className="floating-orb"></div>
            </div>
          </div>
        </div>

        {/* --- FEATURE CARDS --- */}
        <div className="prep-cards-grid-row">
          {modes.map((mode) => (
            <div key={mode.id} className={`prep-mode-card ${mode.color}`} onClick={() => onSelectMode && onSelectMode(mode.id)}>
              <div className="mode-card-pedestal">
                <div className="pedestal-surface"></div>
                <div className="mode-card-icon">{mode.icon}</div>
              </div>
              <div className="mode-card-info">
                <h3>{mode.title}</h3>
                <p>{mode.desc}</p>
              </div>
              <div className="mode-card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>
          ))}
        </div>

        {/* --- MOTIVATION STRIP --- */}
        <div className="prep-footer-strip">
          {microMotivations.map((item, i) => (
            <div key={i} className="footer-micro-card">
              <div className="micro-icon-sphere" style={{'--accent': item.color}}>{item.icon}</div>
              <div className="micro-info-text">
                <h4 style={{color: item.color}}>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;

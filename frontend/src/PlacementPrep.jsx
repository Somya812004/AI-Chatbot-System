import React from 'react';
import './PlacementPrep.css';

const PlacementPrep = ({ onSelectMode }) => {
  const modes = [
    {
      id: 'coding',
      title: 'Coding Prep',
      desc: 'Master DSA & problem solving with AI guidance',
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
      desc: 'Sharpen quantitative, logical & verbal skills',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      id: 'interview',
      title: 'Interview Prep',
      desc: 'Practice HR, behavioral & mock interviews',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      )
    }
  ];

  return (
    <div className="prep-container">
      <div className="prep-glow-overlay"></div>
      
      <div className="prep-header">
        <span className="prep-glowing-tag">Placement Preparation</span>
        <h1 className="prep-main-title">Crack Your Dream Job, <br/><span>One Step at a Time</span></h1>
        <p className="prep-subtitle">Prepare across coding, aptitude, and real interviews</p>
      </div>

      <div className="prep-cards-grid">
        {modes.map((mode) => (
          <div key={mode.id} className="prep-glass-card" onClick={() => onSelectMode && onSelectMode(mode.id)}>
            <div className="prep-card-icon-box">
              {mode.icon}
            </div>
            <h2 className="prep-card-title">{mode.title}</h2>
            <p className="prep-card-desc">{mode.desc}</p>
            <div className="prep-card-shine"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementPrep;

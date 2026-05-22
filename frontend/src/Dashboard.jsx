import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setCurrentView, theme, setTheme }) => {
  const cards = [
    {
      id: 'research',
      title: 'Research',
      desc: 'Explore industry trends, top companies, career paths, skills, salaries & more.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      view: 'research',
      color: 'purple'
    },
    {
      id: 'placement',
      title: 'Placement Prep',
      desc: 'Master technical & HR interviews, aptitude, DSA and more with confidence.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        </svg>
      ),
      view: 'placement-prep',
      color: 'blue'
    },
    {
      id: 'resume',
      title: 'Resume Builder',
      desc: 'Create a job-winning resume that stands out and gets you opportunities.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      view: 'resume-builder',
      color: 'purple'
    }
  ];

  return (
    <div className="dashboard-container premium-3d-layout">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="galaxy-overlay"></div>
      <div className="star-particles"></div>

      {/* --- HERO SECTION --- */}
      <div className="hero-grid">
        <div className="hero-content">
          <div className="welcome-tag">Welcome back, <span>User!</span> 👋</div>
          <h1 className="hero-title-3d">
            Build Your Future, <br/>
            <span>One Step at a Time</span>
          </h1>
          
          <div className="hero-motivation-line">
            <span className="star-icon">⭐</span>
            <p>Consistency beats talent — show up every day.</p>
          </div>
        </div>

        <div className="hero-visual-3d">
          <div className="mountain-scene">
            <div className="mountain-peak"></div>
            <div className="mountain-pathway">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`path-step step-${i}`}></div>
              ))}
            </div>
            <div className="success-flag">
              <div className="flag-pole"></div>
              <div className="flag-cloth">P</div>
            </div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            <div className="visual-glow"></div>
          </div>
        </div>
      </div>

      {/* --- FEATURE CARDS --- */}
      <div className="feature-cards-section">
        <div className="cards-grid-3d">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`feature-card-3d ${card.color}`}
              onClick={() => setCurrentView(card.view)}
            >
              <div className="card-platform">
                <div className="platform-glow"></div>
                <div className="card-icon-3d">{card.icon}</div>
              </div>
              <div className="card-info">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <div className="card-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

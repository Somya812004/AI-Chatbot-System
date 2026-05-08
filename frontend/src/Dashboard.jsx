import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setCurrentView, theme, setTheme }) => {
  const cards = [
    {
      id: 'resume',
      title: 'Resume Builder',
      desc: 'Create a job-winning resume',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
      view: 'resume-builder'
    },
    {
      id: 'placement',
      title: 'Placement Prep',
      desc: 'Master technical & HR interviews',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
      view: 'placement-prep'
    },
    {
      id: 'research',
      title: 'Research',
      desc: 'Explore industry trends & companies',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
      view: 'research'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-background-grid"></div>
      
      <div className="hero-section">
        <h1 className="hero-title">Build Your Future, One Step at a Time</h1>
        <p className="hero-subtext">Consistency beats talent — show up every day</p>
      </div>

      <div className="dashboard-cards">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="glass-card"
            onClick={() => setCurrentView(card.view)}
          >
            <div className="card-icon-wrapper">
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

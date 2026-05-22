import { useState } from 'react';
import './Login.css';

export default function Login({ setUserName, setCurrentView }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name to continue.');
      return;
    }
    localStorage.setItem('chat_user_name', trimmed);
    setUserName(trimmed);
    setCurrentView('dashboard');
  };

  return (
    <div className="login-page">
      {/* Animated background orbs */}
      <div className="login-orb orb-1" />
      <div className="login-orb orb-2" />
      <div className="login-orb orb-3" />

      <div className="login-card">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <img src="/logo.png" alt="PathForge AI" />
          </div>
          <div className="login-brand-text">
            <span className="brand-path">PathForge</span>
            <span className="brand-ai">AI</span>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Enter your name to access your dashboard</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              className="login-input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">
            <span>Get Started</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <p className="login-footer">Your AI-powered student growth ecosystem</p>
      </div>
    </div>
  );
}

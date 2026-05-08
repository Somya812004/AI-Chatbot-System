import React, { useState, useEffect, useRef } from 'react';
import './Settings.css';

const CustomSelect = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div className={`select-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption ? selectedOption.label : 'Select...'}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {isOpen && (
        <div className="select-dropdown-list">
          {options.map((opt) => (
            <div 
              key={opt.value} 
              className={`select-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Settings = ({ theme, setTheme }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('user_settings');
    return saved ? JSON.parse(saved) : {
      accentColor: 'purple',
      fontSize: 16,
      uiDensity: 'comfortable',
      codingDifficulty: 'medium',
      showHints: true,
      aptitudeSection: 'quant',
      timerMode: false,
      interviewType: 'mixed',
      evaluationStrictness: 'moderate',
      trackWeakness: true,
      dailyGoal: 5,
      responseStyle: 'detailed',
      adaptiveDifficulty: true
    };
  });

  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
    setShowSaved(true);
    const timer = setTimeout(() => setShowSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Control <span>Center</span></h1>
        <p>Personalize your AI mentorship experience</p>
        {showSaved && <div className="save-indicator">Changes Saved</div>}
      </div>

      <div className="settings-grid">
        {/* --- APPEARANCE --- */}
        <section className="settings-card">
          <h2><span className="card-icon">🎨</span> Appearance</h2>
          <div className="setting-row">
            <label>Theme</label>
            <div className="toggle-group">
              <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Dark</button>
              <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>Light</button>
            </div>
          </div>
          <div className="setting-row">
            <label>Accent Color</label>
            <div className="color-picker">
              {['purple', 'blue', 'pink'].map(c => (
                <div 
                  key={c} 
                  className={`color-dot ${c} ${settings.accentColor === c ? 'active' : ''}`}
                  onClick={() => updateSetting('accentColor', c)}
                />
              ))}
            </div>
          </div>
          <div className="setting-row">
            <label>Font Size ({settings.fontSize}px)</label>
            <input 
              type="range" min="12" max="24" 
              value={settings.fontSize} 
              onChange={(e) => updateSetting('fontSize', e.target.value)}
            />
          </div>
        </section>

        {/* --- CODING PREFERENCES --- */}
        <section className="settings-card">
          <h2><span className="card-icon">💻</span> Coding Prep</h2>
          <div className="setting-row">
            <label>Default Difficulty</label>
            <CustomSelect 
              value={settings.codingDifficulty} 
              onChange={(v) => updateSetting('codingDifficulty', v)}
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' }
              ]}
            />
          </div>
          <div className="setting-row">
            <label>Auto-Show Hints</label>
            <div className={`switch ${settings.showHints ? 'on' : ''}`} onClick={() => updateSetting('showHints', !settings.showHints)}>
              <div className="knob" />
            </div>
          </div>
        </section>

        {/* --- INTERVIEW SETTINGS --- */}
        <section className="settings-card">
          <h2><span className="card-icon">🎙️</span> Interview Prep</h2>
          <div className="setting-row">
            <label>Preferred Type</label>
            <CustomSelect 
              value={settings.interviewType} 
              onChange={(v) => updateSetting('interviewType', v)}
              options={[
                { value: 'hr', label: 'HR / Behavioral' },
                { value: 'technical', label: 'Technical' },
                { value: 'mixed', label: 'Mixed' }
              ]}
            />
          </div>
          <div className="setting-row">
            <label>Strictness</label>
            <div className="toggle-group small">
              {['lenient', 'moderate', 'strict'].map(s => (
                <button key={s} className={settings.evaluationStrictness === s ? 'active' : ''} onClick={() => updateSetting('evaluationStrictness', s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- ASSISTANT BEHAVIOR --- */}
        <section className="settings-card">
          <h2><span className="card-icon">🤖</span> AI Assistant</h2>
          <div className="setting-row">
            <label>Response Style</label>
            <CustomSelect 
              value={settings.responseStyle} 
              onChange={(v) => updateSetting('responseStyle', v)}
              options={[
                { value: 'concise', label: 'Concise' },
                { value: 'detailed', label: 'Detailed' }
              ]}
            />
          </div>
          <div className="setting-row">
            <label>Adaptive Difficulty</label>
            <div className={`switch ${settings.adaptiveDifficulty ? 'on' : ''}`} onClick={() => updateSetting('adaptiveDifficulty', !settings.adaptiveDifficulty)}>
              <div className="knob" />
            </div>
          </div>
        </section>

        {/* --- PERFORMANCE --- */}
        <section className="settings-card">
          <h2><span className="card-icon">📊</span> Performance</h2>
          <div className="setting-row">
            <label>Daily Goal ({settings.dailyGoal} questions)</label>
            <input 
              type="range" min="1" max="20" 
              value={settings.dailyGoal} 
              onChange={(e) => updateSetting('dailyGoal', e.target.value)}
            />
          </div>
          <div className="setting-row">
            <label>Track Weak Areas</label>
            <div className={`switch ${settings.trackWeakness ? 'on' : ''}`} onClick={() => updateSetting('trackWeakness', !settings.trackWeakness)}>
              <div className="knob" />
            </div>
          </div>
          <button className="reset-btn" onClick={() => { if(window.confirm('Reset progress?')) localStorage.clear(); window.location.reload(); }}>
            Reset All Progress
          </button>
        </section>
      </div>

      <div className="settings-footer">
        <a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="attribution-link" title="Powered by Groq AI technology">
          <span>✨</span> Made with Groq AI
        </a>
      </div>
    </div>
  );
};

export default Settings;

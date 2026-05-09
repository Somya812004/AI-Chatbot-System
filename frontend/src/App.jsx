import { useState, useEffect, useRef } from 'react'
import './App.css'
import html2pdf from 'html2pdf.js'
import PlacementPlan from './PlacementPlan'
import Dashboard from './Dashboard'
import PlacementPrep from './PlacementPrep'
import Settings from './Settings'
import Research from './Research'
import ResumeBuilder from './ResumeBuilder'


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [currentView, setCurrentView] = useState('dashboard')
  const [activePrepMode, setActivePrepMode] = useState(null)
  const [userName, setUserName] = useState(localStorage.getItem('chat_user_name') || '')
  
  // Onboarding States

  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('chat_user_name'))
  const [tempName, setTempName] = useState('')

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your pathForge AI. How can I help you build your profile today?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (currentView === 'resume-builder') {
      setMessages([]); // Clear for fresh start
      setIsLoading(true);
      
      const sequence = [
        "Hi 👋<br>Welcome to <b>PathForge AI Resume Builder</b>.",
        "I'll help you create a professional ATS-friendly resume step by step 🚀",
        "Let's get started!",
        "<b>Step 1 of 9</b>:<br>What's your full name?"
      ];

      let currentDelay = 500;
      sequence.forEach((text, i) => {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: text }]);
          if (i === sequence.length - 1) setIsLoading(false);
        }, currentDelay);
        currentDelay += 1500; // 1.5s delay between messages
      });
    } else if (currentView === 'dashboard') {
       setMessages([{ role: 'assistant', content: "Hi! I'm your pathForge AI. How can I help you build your profile today?" }]);
    }
  }, [currentView]);

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
      localStorage.setItem('chat_user_name', tempName.trim());
      setShowOnboarding(false);
    }
  };

  const handleSendMessage = async (e, forcedInput = null) => {
    if (e) e.preventDefault()
    const messageContent = forcedInput || input
    if (!messageContent.trim() || isLoading) return

    const userMessage = { role: 'user', content: messageContent }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages,
          mode: activePrepMode || currentView
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Please check if the backend is running and the API key is valid.` }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = async (elementId) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return;
      const options = {
        margin: [10, 10, 10, 10],
        filename: 'resume.pdf',
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      const worker = html2pdf.default ? html2pdf.default() : html2pdf();
      await worker.set(options).from(element).save();
    } catch (error) {
      console.error("PDF gen error:", error);
    }
  }

  // STEP 1: ONBOARDING SCREEN
  if (showOnboarding) {
    return (
      <div className="onboarding-full-page">
        <div className="onboarding-card animate-zoom-in">
          <div className="onboarding-header">
            <div className="onboarding-brand">
              <div className="brand-logo-main" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="80" height="80" rx="16" fill="var(--indigo-600)" />
                  <path d="M35 70V30H55C62.5 30 68 35.5 68 43C68 50.5 62.5 56 55 56H35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 56L68 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="brand-title" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
                <span className="brand-path" style={{ fontSize: '1.5rem' }}>PathForge</span>
                <span className="brand-ai" style={{ fontSize: '1.5rem' }}>AI</span>
              </div>
            </div>
            <h2>Welcome to pathForge AI</h2>
            <p>Let’s personalize your experience</p>
          </div>
          <form onSubmit={handleOnboardingSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="start-btn">Get Started</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}`}>
      <aside className="sidebar premium-sidebar">
        {/* --- BRAND SECTION --- */}
        <div className="sidebar-brand-container" onClick={() => setCurrentView('dashboard')}>
          <div className="brand-flex">
            <div className="brand-logo-main">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M7 14l3-3 3 3M7 10l3-3 3 3" />
              </svg>
            </div>
            <div className="brand-info">
              <div className="brand-title">
                <span className="brand-path">PathForge</span>
                <span className="brand-ai">AI</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- NAVIGATION --- */}
        <nav className="sidebar-nav-premium">
          <button className={`nav-card ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            </div>
            <span>Dashboard</span>
          </button>
          
          <button className={`nav-card ${currentView === 'resume-builder' ? 'active' : ''}`} onClick={() => setCurrentView('resume-builder')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <span>Resume Builder</span>
          </button>
          
          <button className={`nav-card ${currentView === 'placement-prep' ? 'active' : ''}`} onClick={() => setCurrentView('placement-prep')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <span>Placement Prep</span>
          </button>
          
          <button className={`nav-card ${currentView === 'research' ? 'active' : ''}`} onClick={() => setCurrentView('research')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <span>Research</span>
          </button>
          
          <button className={`nav-card ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </div>
            <span>Settings</span>
          </button>
        </nav>

        {/* --- PROFILE & LOGOUT --- */}
        <div className="sidebar-footer-premium">
          <div className="mode-toggle-row">
            <span className="mode-label">Light Mode</span>
            <div className={`toggle-switch-wrap ${theme}`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="profile-card-premium">
            <div className="avatar-premium">A</div>
            <div className="profile-info">
              <span className="profile-name">Admin</span>
              <span className="profile-subtitle">View Profile</span>
            </div>
          </div>

          <button className="logout-card-premium" onClick={() => { localStorage.removeItem('chat_user_name'); window.location.reload(); }}>
            <div className="logout-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            <div className="logout-text">
              <span className="logout-title">Logout</span>
              <span className="logout-subtitle">See you soon!</span>
            </div>
          </button>
        </div>
      </aside>

      <main className="main-wrapper">
        <div className="global-theme-toggle">
          <div 
            className={`theme-switch-pill ${theme}`} 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <div className="switch-knob">
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px' }}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px' }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </div>
            <span className="switch-icon">🌙</span>
            <span className="switch-icon">☀️</span>
          </div>
        </div>
        
        {currentView === 'dashboard' ? (
          <Dashboard setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        ) : currentView === 'resume-builder' ? (
          <ResumeBuilder userName={userName} />

        ) : currentView === 'placement-prep' ? (
          activePrepMode ? (
            <PlacementPlan 
              userName={userName}
              assistantProps={{ messages, input, setInput, handleSendMessage, isLoading, handleDownloadPDF, messagesEndRef, textareaRef }} 
            />
          ) : (
            <PlacementPrep onSelectMode={(mode) => {
              if (mode === 'coding') {
                window.open('http://localhost:5000/coding', '_blank');
              } else if (mode === 'interview') {
                window.open('http://localhost:5000/interview', '_blank');
              } else if (mode === 'aptitude') {
                window.open('http://localhost:5000/aptitude', '_blank');
              }
            }} />
          )
        ) : currentView === 'research' ? (
          <Research />
        ) : currentView === 'settings' ? (
          <Settings theme={theme} setTheme={setTheme} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#a0a0b0', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Coming Soon</h2>
            <p>The {currentView.replace('-', ' ')} module is currently under development.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

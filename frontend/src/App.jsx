import { useState, useEffect, useRef } from 'react'
import './App.css'
import html2pdf from 'html2pdf.js'
import PlacementPlan from './PlacementPlan'
import Dashboard from './Dashboard'
import PlacementPrep from './PlacementPrep'
import Settings from './Settings'
import Research from './Research'
import ResumeBuilder from './ResumeBuilder'
import SkillGapAnalyzer from './SkillGapAnalyzer'
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';
import Login from './Login';
import AptitudePrep from './AptitudePrep'
import InterviewPrep from './InterviewPrep'
import CodingPrep from './CodingPrep'

const getInitialView = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '/dashboard') return 'dashboard';
  if (path === '/placement-prep/coding-prep') return 'coding-prep';
  if (path === '/placement-prep/aptitude-prep') return 'aptitude-prep';
  if (path === '/placement-prep/interview-prep') return 'interview-prep';
  const view = path.substring(1);
  if (['research', 'resume-builder', 'placement-prep', 'settings', 'skill-gap'].includes(view)) {
    return view;
  }
  return localStorage.getItem('currentView') || 'dashboard';
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [currentView, setCurrentView] = useState(getInitialView)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activePrepMode, setActivePrepMode] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('chat_user_name') || 'Renuka')
  
  // Onboarding States

  const [showOnboarding, setShowOnboarding] = useState(false)
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
    localStorage.setItem('currentView', currentView)
    
    let path = '/';
    if (currentView === 'dashboard') path = '/';
    else if (currentView === 'coding-prep') path = '/placement-prep/coding-prep';
    else if (currentView === 'aptitude-prep') path = '/placement-prep/aptitude-prep';
    else if (currentView === 'interview-prep') path = '/placement-prep/interview-prep';
    else path = `/${currentView}`;

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [currentView])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Protect routes – if not logged in, force to login page
  useEffect(() => {
    const protectedViews = ['dashboard', 'research', 'placement-prep', 'coding-prep', 'aptitude-prep', 'interview-prep', 'resume-builder', 'settings', 'skill-gap'];
    const isAuthenticated = !!userName;
    if (!isAuthenticated && protectedViews.includes(currentView)) {
      setCurrentView('login');
    }
  }, [userName, currentView]);

  useEffect(() => {
    if (currentView === 'resume-builder') {
      setMessages([]);
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
        currentDelay += 1500;
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
      let endpoint = 'http://127.0.0.1:5000/api/ai-assistant/chat';
      let payload = { messages: updatedMessages };

      if (currentView === 'resume-builder') {
        endpoint = 'http://127.0.0.1:5000/api/resume-builder/generate';
      } else if (currentView === 'placement-prep' && activePrepMode) {
        endpoint = `http://127.0.0.1:5000/api/placement-prep/${activePrepMode}/chat`;
      } else if (currentView === 'research') {
        endpoint = 'http://127.0.0.1:5000/api/research/unified';
        payload = { query: updatedMessages[updatedMessages.length - 1].content };
      } else {
        endpoint = 'http://127.0.0.1:5000/api/ai-assistant/chat';
        payload = { message: updatedMessages[updatedMessages.length - 1].content, user_id: userName || 'default' };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  if (showOnboarding) {
    return (
      <div className="onboarding-full-page">
        <div className="onboarding-card animate-zoom-in">
          <div className="onboarding-header">
            <div className="onboarding-brand">
              <div className="brand-logo-main" style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem' }}>
                <img src="/logo.png" alt="PathForge AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
      {currentView !== 'login' && !['coding-prep','aptitude-prep','interview-prep'].includes(currentView) && (<aside className="sidebar premium-sidebar">
        <div className="sidebar-brand-container" onClick={() => setCurrentView('dashboard')}>
          <div className="brand-flex">
            <div className="brand-logo-main">
              <img src="/logo.png" alt="PathForge AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="brand-info">
              <div className="brand-title">
                <span className="brand-path">PathForge</span>
                <span className="brand-ai">AI</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav-premium">
          <button className={`nav-card ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            </div>
            <span>Dashboard</span>
          </button>
          
          <button className={`nav-card ${currentView === 'research' ? 'active' : ''}`} onClick={() => setCurrentView('research')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <span>Research</span>
          </button>

          <button className={`nav-card ${['placement-prep', 'coding-prep', 'aptitude-prep', 'interview-prep', 'skill-gap'].includes(currentView) ? 'active' : ''}`} onClick={() => { setCurrentView('placement-prep'); setActivePrepMode(null); }}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <span>Placement Prep</span>
          </button>

          <button className={`nav-card ${currentView === 'resume-builder' ? 'active' : ''}`} onClick={() => setCurrentView('resume-builder')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <span>Resume Builder</span>
          </button>
          
          <button className={`nav-card ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')}>
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </div>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer-premium">
          <div className="mode-toggle-row">
            <span className="mode-label">Light Mode</span>
            <div className={`toggle-switch-wrap ${theme}`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="profile-card-premium">
            <div className="avatar-premium">{userName ? userName[0].toUpperCase() : 'U'}</div>
            <div className="profile-info">
              <span className="profile-name">{userName || 'User'}</span>
              <span className="profile-subtitle">View Profile</span>
            </div>
          </div>

          <button className="logout-card-premium" onClick={() => setShowLogoutConfirm(true)}>
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
    )}

      <main className="main-wrapper">
        {!['coding-prep', 'aptitude-prep', 'interview-prep'].includes(currentView) && (
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
        )}
        
        {showLogoutConfirm && (
          <ConfirmDialog
            title="Logout"
            message="Are you sure you want to logout?"
            confirmLabel="Logout"
            cancelLabel="Cancel"
            onConfirm={async () => {
              setIsLoggingOut(true);
              // Simulate async logout (e.g., Firebase signOut)
              try {
                // If Firebase auth is used, call signOut();
                // await firebaseAuth.signOut();
              } catch (e) {
                console.error('Logout error', e);
              }
              // Clear auth data
              localStorage.removeItem('chat_user_name');
              localStorage.removeItem('currentView');
              setUserName('');
              setCurrentView('login');
              setMessages([]);
              setInput('');
              setToastMessage('Logged out successfully');
              setIsLoggingOut(false);
              setShowLogoutConfirm(false);
            }}
            onCancel={() => setShowLogoutConfirm(false)}
            loading={isLoggingOut}
          />
        )}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />
        )}
        {currentView === 'login' ? (
          <Login setUserName={setUserName} setCurrentView={setCurrentView} />
        ) : currentView === 'dashboard' ? (
          <Dashboard setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        ) : currentView === 'placement-prep' ? (
          activePrepMode ? (
            <PlacementPlan 
              userName={userName}
              assistantProps={{ messages, input, setInput, handleSendMessage, isLoading, handleDownloadPDF, messagesEndRef, textareaRef }} 
            />
          ) : (
            <PlacementPrep onSelectMode={(mode) => {
              if (mode === 'coding') {
                const base = window.location.origin;
                window.open(`${base}/placement-prep/coding-prep`, '_blank');
              } else if (mode === 'interview') {
                const base = window.location.origin;
                window.open(`${base}/placement-prep/interview-prep`, '_blank');
              } else if (mode === 'aptitude') {
                const base = window.location.origin;
                window.open(`${base}/placement-prep/aptitude-prep`, '_blank');
              } else if (mode === 'skill-gap') {
                setCurrentView('skill-gap');
              }
            }} />
          )
        ) : currentView === 'coding-prep' ? (
          <CodingPrep setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        ) : currentView === 'aptitude-prep' ? (
          <AptitudePrep setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        ) : currentView === 'interview-prep' ? (
          <InterviewPrep setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        ) : currentView === 'research' ? (
          <Research />
        ) : currentView === 'resume-builder' ? (
          <ResumeBuilder userName={userName} />
        ) : currentView === 'skill-gap' ? (
          <SkillGapAnalyzer userName={userName} setCurrentView={setCurrentView} />
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

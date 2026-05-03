import { useState, useEffect, useRef } from 'react'
import './App.css'
import logo from './assets/logo.png'
import html2pdf from 'html2pdf.js'
import PlacementPlan from './PlacementPlan'
import Dashboard from './Dashboard'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [currentView, setCurrentView] = useState('dashboard')
  
  // Onboarding States
  const [userName, setUserName] = useState(localStorage.getItem('chat_user_name') || '')
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('chat_user_name'))
  const [tempName, setTempName] = useState('')

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI Resume Assistant. How can I help you build your profile today?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
      localStorage.setItem('chat_user_name', tempName.trim());
      setShowOnboarding(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Server error');
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
            <div className="logo-icon large">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
            <h2>Welcome to AI Resume Assistant</h2>
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

  // STEP 2: APP SCREEN
  return (
    <div className={`app-container dark`}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`side-nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')} title="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            <span>Dashboard</span>
          </button>
          <button className={`side-nav-item ${currentView === 'resume-builder' ? 'active' : ''}`} onClick={() => setCurrentView('resume-builder')} title="Resume Builder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            <span>Resume Builder</span>
          </button>
          <button className={`side-nav-item ${currentView === 'placement-prep' ? 'active' : ''}`} onClick={() => setCurrentView('placement-prep')} title="Placement Prep">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            <span>Placement Prep</span>
          </button>
          <button className={`side-nav-item ${currentView === 'research' ? 'active' : ''}`} onClick={() => setCurrentView('research')} title="Research">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Research</span>
          </button>
          <button className="side-nav-item" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-small">
            <div className="avatar-micro">{userName ? userName[0].toUpperCase() : 'U'}</div>
            <span>{userName}</span>
          </div>
          <button className="logout-btn" onClick={() => { localStorage.removeItem('chat_user_name'); window.location.reload(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-wrapper">
        {currentView === 'dashboard' ? (
          <Dashboard setCurrentView={setCurrentView} />
        ) : currentView === 'resume-builder' ? (
          <PlacementPlan 
            userName={userName}
            assistantProps={{ messages, input, setInput, handleSendMessage, isLoading, handleDownloadPDF, messagesEndRef, textareaRef }} 
          />
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

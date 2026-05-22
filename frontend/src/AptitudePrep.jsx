import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Paperclip, Calculator, Sun, Moon, 
  Sparkles, BookOpen, Cpu, Copy, Check, ChevronRight, 
  Trophy, Flame, RefreshCw, BarChart2, Lightbulb, Zap, 
  HelpCircle, Calendar, Plus, Settings, AlertTriangle
} from 'lucide-react';
import './AptitudePrep.css';

// SVG Icon Helper for Left Sidebar Topics
const getTopicIcon = (name) => {
  switch (name) {
    case 'Number System':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'Percentages':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      );
    case 'Profit & Loss':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'Ratio & Proportion':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="12" cy="17" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" />
          <circle cx="16" cy="12" r="1.5" />
        </svg>
      );
    case 'Averages':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    case 'Time & Work':
    case 'Time, Speed & Distance':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'Simple Interest':
    case 'Compound Interest':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case 'Algebra':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case 'Geometry':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 22 22 2 22" />
        </svg>
      );
    case 'Mensuration':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'Data Interpretation':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M212 12A9 9 0 1 1 12 3v9z" />
          <path d="M12 3a9 9 0 0 1 9 9h-9z" />
        </svg>
      );
    case 'Logical Reasoning':
      return (
        <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.12A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.12A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      );
    default:
      return <BookOpen className="topic-icon" size={16} />;
  }
};

// SVG line chart for Performance Overview
const PerformanceChart = () => {
  return (
    <div className="performance-chart-container">
      <svg viewBox="0 0 300 80" className="performance-svg">
        <defs>
          <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal grid lines */}
        <line x1="0" y1="15" x2="300" y2="15" stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" />
        <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" />
        <line x1="0" y1="65" x2="300" y2="65" stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" />

        {/* Filled wave area */}
        <path 
          d="M 10 70 L 10 50 Q 50 60, 90 40 T 170 52 T 230 35 T 290 20 L 290 70 Z" 
          fill="url(#avgGradient)" 
        />
        
        {/* Wave path line */}
        <path 
          d="M 10 50 Q 50 60, 90 40 T 170 52 T 230 35 T 290 20" 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        
        {/* Data points */}
        <circle cx="10" cy="50" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
        <circle cx="90" cy="40" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
        <circle cx="170" cy="52" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
        <circle cx="230" cy="35" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
        <circle cx="290" cy="20" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
      </svg>
    </div>
  );
};

// Formatting formula, examples, list rendering
const formatInlineMath = (text) => {
  if (!text) return '';
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Custom code or variables `x` or `1/10`
  formatted = formatted.replace(/`(.*?)`/g, '<code class="inline-math">$1</code>');
  
  // Bullet items
  formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, '<li class="aptitude-list-item">$1</li>');

  // New lines
  formatted = formatted.replace(/\n/g, '<br />');

  return formatted;
};

// Rich bubble parser (renders Tip Boxes, Formula Boxes, solutions, etc.)
const parseAptitudeMessage = (text) => {
  if (!text) return null;

  // Split content by "Formula:" or "💡 Quick Tip" or "Quick Tip:" to build custom layout wrappers
  const parts = text.split(/(Formula:|💡 Quick Tip|Quick Tip:)/g);
  
  let currentSectionType = 'text'; // 'text', 'formula', 'tip'
  const renderedElements = [];

  parts.forEach((part, index) => {
    if (!part) return;

    if (part === 'Formula:') {
      currentSectionType = 'formula';
    } else if (part === '💡 Quick Tip' || part === 'Quick Tip:') {
      currentSectionType = 'tip';
    } else {
      const htmlContent = formatInlineMath(part);
      if (currentSectionType === 'formula') {
        renderedElements.push(
          <div key={index} className="formula-block-box">
            <span className="formula-label">Formula:</span>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        );
        currentSectionType = 'text'; // Reset
      } else if (currentSectionType === 'tip') {
        renderedElements.push(
          <div key={index} className="quick-tip-block-box">
            <div className="tip-header-row">
              <Lightbulb size={16} className="tip-bulb-icon" />
              <span className="tip-label">Quick Tip</span>
            </div>
            <div className="tip-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        );
        currentSectionType = 'text'; // Reset
      } else {
        renderedElements.push(
          <div key={index} className="aptitude-paragraph" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
      }
    }
  });

  return renderedElements;
};

const AptitudePrep = ({ setCurrentView, theme, setTheme }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `👋 **Welcome to Aptitude Prep!**\nAsk me any aptitude question or concept to understand.\nHow can I assist you today?`,
      time: '10:30 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Number System');
  const [selectedPractice, setSelectedPractice] = useState('');
  
  // Custom bottom toolbar tools
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMathSymbols, setShowMathSymbols] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');
  
  const chatBottomRef = useRef(null);
  const textInputRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (forcedText = '', isSuggestedFollowup = false) => {
    const textToSend = forcedText.trim() || input.trim();
    if (!textToSend) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: textToSend, time: currentTime };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call API with mock fallback
    try {
      const updatedMessages = [...messages, userMsg];
      const response = await fetch('http://127.0.0.1:5000/api/placement-prep/aptitude/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      const data = await response.json();
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.ok && data.response) {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: data.response, 
          time: botTime,
          hasSuggestions: true
        }]);
      } else {
        throw new Error("Server response error");
      }
    } catch (e) {
      console.warn("Backend API failed, falling back to simulated Aptitude response:", e);
      setTimeout(() => {
        const reply = generateMockAptitudeReply(textToSend);
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: reply, 
          time: botTime,
          hasSuggestions: true
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    setIsLoading(false);
  };

  const generateMockAptitudeReply = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('time and work') || q.includes('time & work')) {
      return `### Time and Work\nTime and Work problems deal with the time taken by individuals or machines to complete a piece of work.\n\nFormula:\nWork = Time × Rate of Work\n\nExample:\nIf A can do a work in 10 days and B can do the same work in 15 days. In how many days will they finish the work together?\n\nSolution:\n- A's 1 day work = 1/10\n- B's 1 day work = 1/15\n- Together 1 day work = 1/10 + 1/15 = 5/30 = 1/6\n- So, together they will finish the work in 6 days.\n\n💡 Quick Tip\nTry to find the LCM of the denominators while adding the work done in a day.`;
    }

    if (q.includes('percentage') || q.includes('percentages')) {
      return `### Percentages\nA percentage is a number or ratio expressed as a fraction of 100.\n\nFormula:\nPercentage = (Value / Total Value) × 100\n\nExample:\nIf a student scores 45 out of 60 marks, what is their percentage?\n\nSolution:\n- Score = 45, Max Marks = 60\n- Percentage = (45 / 60) × 100\n- Percentage = 0.75 × 100 = 75%\n\n💡 Quick Tip\nTo quickly find 10% of a number, just move the decimal point one place to the left. For 1%, move it two places to the left.`;
    }

    if (q.includes('profit') || q.includes('loss')) {
      return `### Profit & Loss\nProfit and Loss are terms used to describe financial gains or losses in trading and business.\n\nFormula:\nProfit = Selling Price (SP) - Cost Price (CP)\nLoss = Cost Price (CP) - Selling Price (SP)\nProfit % = (Profit / CP) × 100\nLoss % = (Loss / CP) × 100\n\nExample:\nAn item bought for $200 is sold for $240. Find the profit percentage.\n\nSolution:\n- CP = $200, SP = $240\n- Profit = 240 - 200 = $40\n- Profit % = (40 / 200) × 100 = 20%\n\n💡 Quick Tip\nRemember that Profit % and Loss % are always calculated on the Cost Price (CP) unless specified otherwise in the question.`;
    }

    if (q.includes('shortcut') || q.includes('trick') || q.includes('formula')) {
      return `### Essential Aptitude Shortcuts & Formulas\nHere are some of the most critical math shortcuts:\n\n- **LCM Method for Time & Work**: If A completes work in 'x' days and B in 'y' days, together they take \`(x × y) / (x + y)\` days.\n- **Average Speed**: When two equal distances are traveled at speeds 'u' and 'v', the average speed is \`(2uv) / (u + v)\`.\n- **Percentage increase**: \`(Difference / Original Value) × 100\`.\n\n💡 Quick Tip\nMemorize the fractional equivalents of common percentages (e.g., 12.5% = 1/8, 16.66% = 1/6, 33.33% = 1/3) to solve percentage questions in seconds!`;
    }

    return `I am your AI Aptitude Assistant. I can help you with:\n- Practicing quantitative questions (\`${selectedTopic}\` is selected)\n- Explaining steps to solve logical reasoning and verbal ability questions\n- Sharing quick formulas and calculation shortcuts\n\nAsk me any question or select a topic from the left sidebar to practice.`;
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setInput(`Explain the **${topic}** concept with an example and give me a practice question.`);
    textInputRef.current?.focus();
  };

  const handlePracticeSelect = (mode) => {
    setSelectedPractice(mode);
    setInput(`Give me a practice **${mode}** set for Aptitude preparation.`);
    textInputRef.current?.focus();
  };

  const handleQuickAction = (action) => {
    let queryText = '';
    switch (action) {
      case 'Generate Question':
        queryText = `Generate a competitive aptitude question on **${selectedTopic}** and ask me to solve it.`;
        break;
      case 'Explain Solution':
        queryText = `Explain step-by-step how to solve this aptitude problem:\n\n[Paste your question here]`;
        break;
      case 'Shortcuts & Formulas':
        queryText = `Give me quick formulas, shortcuts, and cheat sheet notes for **${selectedTopic}**.`;
        break;
      case 'Aptitude Tips':
        queryText = `Give me 5 time-saving tips and tricks for crack solving placement aptitude papers.`;
        break;
      default:
        return;
    }
    setInput(queryText);
    textInputRef.current?.focus();
  };

  const handlePillClick = (difficulty) => {
    handleSend(`Generate an easy, medium or hard question. Specifically, give me a **${difficulty}** question on **${selectedTopic}**.`);
  };

  // Calculator logic
  const handleCalcBtnClick = (val) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Safe evaluation for basic equations
        const sanitized = calcInput.replace(/[^-+*/().0-9]/g, '');
        const res = (0, eval)(sanitized);
        setCalcResult(String(res));
      } catch (e) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  const insertCalcResult = () => {
    if (calcResult && calcResult !== 'Error') {
      setInput(prev => prev + calcResult);
      setShowCalculator(false);
      textInputRef.current?.focus();
    }
  };

  // Math symbols inserter
  const insertSymbol = (sym) => {
    setInput(prev => prev + sym);
    textInputRef.current?.focus();
  };

  const aptitudeTopicsList = [
    'Number System', 'Percentages', 'Profit & Loss', 'Ratio & Proportion',
    'Averages', 'Time & Work', 'Time, Speed & Distance', 'Simple Interest',
    'Compound Interest', 'Algebra', 'Geometry', 'Mensuration',
    'Data Interpretation', 'Permutation & Combination', 'Probability', 'Logical Reasoning'
  ];

  const practiceModesList = ['Topic Tests', 'Mixed Tests', 'Mock Tests', 'Previous Year Papers'];
  const quickActionsList = ['Generate Question', 'Explain Solution', 'Shortcuts & Formulas', 'Aptitude Tips'];

  const topicProgressList = [
    { name: 'Number System', progress: 80 },
    { name: 'Percentages', progress: 65 },
    { name: 'Profit & Loss', progress: 55 },
    { name: 'Ratio & Proportion', progress: 70 },
    { name: 'Time & Work', progress: 40 }
  ];

  const quickPracticeList = [
    { diff: 'Easy', count: '10 Questions', class: 'easy' },
    { diff: 'Medium', count: '15 Questions', class: 'medium' },
    { diff: 'Hard', count: '20 Questions', class: 'hard' },
    { diff: 'Mixed', count: '25 Questions', class: 'mixed' }
  ];

  const shortcutTipsList = [
    { title: 'Important Formulas', color: 'red' },
    { title: 'Time Saving Tricks', color: 'green' },
    { title: 'Common Mistakes', color: 'orange' }
  ];

  return (
    <div className="aptitude-prep-container">
      {/* LEFT PANEL: TOPICS & PRACTICE SIDEBAR */}
      <aside className="workspace-left-sidebar">
        <button className="back-btn-premium" onClick={() => setCurrentView('placement-prep')}>
          <ArrowLeft size={16} />
          <span>Back to Modules</span>
        </button>

        <div className="sidebar-scrollable-content">
          {/* Aptitude Topics */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">APTITUDE TOPICS</span>
            <div className="sidebar-items-list">
              {aptitudeTopicsList.map((topic) => (
                <button
                  key={topic}
                  className={`sidebar-item-btn ${selectedTopic === topic ? 'active' : ''}`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {getTopicIcon(topic)}
                  <span className="item-label">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Section */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">PRACTICE</span>
            <div className="sidebar-items-list">
              {practiceModesList.map((mode) => (
                <button
                  key={mode}
                  className={`sidebar-item-btn ${selectedPractice === mode ? 'active' : ''}`}
                  onClick={() => handlePracticeSelect(mode)}
                >
                  <Calendar size={15} />
                  <span className="item-label">{mode}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">QUICK ACTIONS</span>
            <div className="sidebar-items-list">
              {quickActionsList.map((action) => (
                <button
                  key={action}
                  className="sidebar-item-btn quick-action-item"
                  onClick={() => handleQuickAction(action)}
                >
                  <Sparkles size={15} className="sparkle-icon" />
                  <span className="item-label">{action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MIDDLE PANEL: MAIN AI WORKSPACE */}
      <main className="workspace-center-panel">
        <header className="workspace-header">
          <div className="header-titles">
            <span className="category-tag">APTITUDE PREP</span>
            <h1 className="header-main-title">AI Aptitude Assistant</h1>
            <p className="header-subtitle">Learn concepts, practice questions, and improve your problem solving skills.</p>
          </div>
          
          <div className="theme-toggle-container">
            <button 
              className={`theme-toggle-pill ${theme}`} 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title="Toggle Theme"
            >
              <div className="theme-knob">
                {theme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
              </div>
              <span className="toggle-label-sun">☀️</span>
              <span className="toggle-label-moon">🌙</span>
            </button>
          </div>
        </header>

        {/* Floating background math decorations */}
        <div className="floating-decorations">
          <div className="decor-glow-purple"></div>
          <span className="decor-icon icon-1">%</span>
          <span className="decor-icon icon-2">×</span>
          <span className="decor-icon icon-3">÷</span>
          <span className="decor-icon icon-4">∑</span>
          <span className="decor-icon icon-5">π</span>
          <span className="decor-icon icon-6">√</span>
        </div>

        {/* Chat History View */}
        <div className="chat-history-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="message-avatar bot">
                  <div className="avatar-circle purple-gradient">
                    <Sparkles size={16} />
                  </div>
                </div>
              )}
              
              <div className="bubble-wrapper-suggestions">
                <div className={`message-bubble ${msg.sender}`}>
                  <div className="bubble-content">
                    {msg.sender === 'bot' ? parseAptitudeMessage(msg.text) : msg.text}
                  </div>
                  {msg.time && <span className="bubble-time">{msg.time}</span>}
                </div>

                {/* Follow-up Suggestion pills below Bot Message */}
                {msg.sender === 'bot' && msg.hasSuggestions && (
                  <div className="followup-suggestions-row">
                    <button className="suggestion-pill-btn" onClick={() => handleSend(`Give me a Similar Question on ${selectedTopic}`)}>Similar Question</button>
                    <button className="suggestion-pill-btn active-pill" onClick={() => handleSend(`Let's Practice Now on ${selectedTopic}`)}>Practice Now</button>
                    <button className="suggestion-pill-btn" onClick={() => handleSend(`Explain in Detail the steps for solving this`)}>Explain in Detail</button>
                    <button className="suggestion-pill-btn" onClick={() => handleSend(`Give me More Examples on ${selectedTopic}`)}>More Examples</button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="message-avatar user">
                  <div className="avatar-circle user-circle">
                    {localStorage.getItem('chat_user_name')?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-row bot">
              <div className="message-avatar bot">
                <div className="avatar-circle purple-gradient loading-spin">
                  <RefreshCw size={16} />
                </div>
              </div>
              <div className="message-bubble bot typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* BOTTOM INPUT CONTAINER GLASS */}
        <div className="chat-input-container-glass">
          {/* Custom Math Symbol Popover */}
          {showMathSymbols && (
            <div className="math-symbols-popover glass-card">
              <div className="popover-header">
                <span>Quick Math Symbols</span>
                <button className="close-popover-btn" onClick={() => setShowMathSymbols(false)}>×</button>
              </div>
              <div className="symbols-grid">
                {['%', '×', '÷', '∑', 'π', '√', '²', '³', '±', '≠', '≈', '∞', 'α', 'β', 'θ', 'λ'].map(s => (
                  <button key={s} className="sym-btn" onClick={() => insertSymbol(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Custom functional mini-calculator Popover */}
          {showCalculator && (
            <div className="calculator-popover glass-card">
              <div className="popover-header">
                <span>Scratchpad Calculator</span>
                <button className="close-popover-btn" onClick={() => setShowCalculator(false)}>×</button>
              </div>
              <div className="calc-screen">
                <div className="calc-input">{calcInput || '0'}</div>
                <div className="calc-result">{calcResult ? `= ${calcResult}` : ''}</div>
              </div>
              <div className="calc-keys">
                {['7', '8', '9', '/', 'C', '4', '5', '6', '*', '(', '1', '2', '3', '-', ')', '0', '.', '=', '+'].map(k => (
                  <button 
                    key={k} 
                    className={`calc-key ${k === '=' ? 'key-equals' : k === 'C' ? 'key-clear' : ''}`}
                    onClick={() => handleCalcBtnClick(k)}
                  >
                    {k}
                  </button>
                ))}
              </div>
              {calcResult && calcResult !== 'Error' && (
                <button className="insert-calc-val-btn" onClick={insertCalcResult}>Insert Result</button>
              )}
            </div>
          )}

          <textarea
            ref={textInputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask any aptitude question or concept..."
            className="workspace-textarea"
          />
          <div className="input-toolbar">
            <div className="toolbar-left-actions">
              <button className="toolbar-btn" title="Attach image / notes">
                <Paperclip size={18} />
              </button>
              <button 
                className={`toolbar-btn ${showCalculator ? 'active-tool' : ''}`} 
                title="Open Scratchpad Calculator"
                onClick={() => { setShowCalculator(!showCalculator); setShowMathSymbols(false); }}
              >
                <Calculator size={18} />
              </button>
              <button 
                className={`toolbar-btn ${showMathSymbols ? 'active-tool' : ''}`} 
                title="Insert Math Symbols"
                onClick={() => { setShowMathSymbols(!showMathSymbols); setShowCalculator(false); }}
              >
                <span className="sigma-tool-icon">∑</span>
              </button>
            </div>
            <button className="send-btn-round" onClick={() => handleSend()} disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL: STATISTICS & RECENT SHORUTS */}
      <aside className="workspace-right-sidebar">
        {/* Topic Progress Card */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <BarChart2 size={16} className="title-icon purple-text" />
              <span>Topic Progress</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show details of my overall aptitude test progress.")}>View All</button>
          </div>
          <div className="progress-bars-list">
            {topicProgressList.map((tp) => (
              <div key={tp.name} className="progress-bar-item">
                <div className="progress-bar-label-row">
                  <span className="p-bar-name">{tp.name}</span>
                  <span className="p-bar-val">{tp.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${tp.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Practice Card */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Zap size={16} className="title-icon purple-text" />
              <span>Quick Practice</span>
            </h3>
          </div>
          <div className="quick-practice-grid">
            {quickPracticeList.map((qp) => (
              <div 
                key={qp.diff} 
                className={`quick-practice-box ${qp.class}`}
                onClick={() => handlePillClick(qp.diff)}
              >
                <span className="qp-diff">{qp.diff}</span>
                <span className="qp-count">{qp.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Trophy size={16} className="title-icon purple-text" />
              <span>Performance Overview</span>
            </h3>
          </div>

          <PerformanceChart />

          <div className="stats-row-grid">
            <div className="stat-box-mini">
              <span className="stat-val solved-color">78%</span>
              <span className="stat-desc">Accuracy</span>
            </div>
            <div className="stat-box-mini">
              <span className="stat-val streak-color">124</span>
              <span className="stat-desc">Solved</span>
            </div>
            <div className="stat-box-mini">
              <span className="stat-val accuracy-color">12</span>
              <span className="stat-desc">Tests Taken</span>
            </div>
          </div>
        </div>

        {/* Aptitude Shortcuts */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Lightbulb size={16} className="title-icon purple-text" />
              <span>Aptitude Shortcuts</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show all aptitude formula cards.")}>View All</button>
          </div>
          <div className="shortcuts-list">
            {shortcutTipsList.map((sc) => (
              <div 
                key={sc.title} 
                className="shortcut-list-item"
                onClick={() => handleSend(`Show cheat sheet details for: ${sc.title}`)}
              >
                <span className={`sc-bullet-dot dot-${sc.color}`}></span>
                <span className="sc-title">{sc.title}</span>
                <ChevronRight size={14} className="sc-arrow" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AptitudePrep;

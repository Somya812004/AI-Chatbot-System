import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Sparkles, Send, Plus, Mic, Paperclip, PanelRightOpen, PanelRightClose,
  Building2, Briefcase, TrendingUp, Route, Brain, BarChart3, Clock, Bookmark, Zap
} from 'lucide-react';
import './Research.css';

const SUGGESTIONS = [
  { icon: Building2, title: 'Company Research', desc: 'Explore culture, hiring & tech stacks', query: 'Tell me about Google — culture, hiring process, tech stack, and best roles for freshers.' },
  { icon: Briefcase, title: 'Role Research', desc: 'Discover career paths & requirements', query: 'What does a typical AI/ML Engineer role look like? Skills, salary, and growth path.' },
  { icon: BarChart3, title: 'Salary Insights', desc: 'Compare compensation data', query: 'Compare salaries for SDE-1 roles at top tech companies in India.' },
  { icon: Route, title: 'Skill Roadmaps', desc: 'Step-by-step learning paths', query: 'Give me a 6-month roadmap to become a full-stack developer from scratch.' },
  { icon: TrendingUp, title: 'Industry Trends', desc: 'Latest market movements', query: 'What are the top technology trends shaping hiring in 2026?' },
  { icon: Zap, title: 'Tech Stack Analyzer', desc: 'Understand tools used by companies', query: 'Analyze the tech stack of Netflix — what tools do they use for frontend, backend, and streaming?' },
];

const PANEL_PROMPTS = [
  "What companies are hiring AI engineers right now?",
  "Compare FAANG vs startup career growth",
  "Best certifications for cloud computing",
  "How to negotiate a higher salary offer?",
];

const TRENDING = ["Generative AI", "Rust Programming", "System Design", "Cloud Native", "LLM Fine-tuning", "Web3 Careers"];

function parseMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
  html = html.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br/>');
  html = `<p>${html}</p>`.replace(/<p><\/p>/g, '');
  return html;
}

const Research = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [conversations, setConversations] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pf_research_convos') || '[]'); } catch { return []; }
  });
  const [activeConvoId, setActiveConvoId] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const saveConversation = (msgs) => {
    if (msgs.length === 0) return;
    const id = activeConvoId || Date.now().toString();
    const title = msgs.find(m => m.role === 'user')?.content?.slice(0, 50) || 'New Chat';
    const updated = [
      { id, title, updatedAt: Date.now(), messages: msgs },
      ...conversations.filter(c => c.id !== id)
    ].slice(0, 15);
    setConversations(updated);
    setActiveConvoId(id);
    localStorage.setItem('pf_research_convos', JSON.stringify(updated));
  };

  const handleSend = async (overrideInput) => {
    const text = (overrideInput || input).trim();
    if (!text || isLoading) return;

    const userMsg = { role: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);
    if (inputRef.current) inputRef.current.style.height = 'auto';

    try {
      const res = await fetch('http://127.0.0.1:5000/api/research/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');

      const aiMsg = { role: 'assistant', content: data.response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      const finalMsgs = [...newMsgs, aiMsg];
      setMessages(finalMsgs);
      saveConversation(finalMsgs);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${err.message}. Make sure the backend is running.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConvoId(null);
  };

  const loadConversation = (convo) => {
    setMessages(convo.messages);
    setActiveConvoId(convo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="research-chat-root">
      <div className="research-bg-layer"><div className="research-bg-grid" /></div>

      {/* ── HEADER ── */}
      <header className="research-chat-header">
        <div className="research-header-left">
          <div className="research-header-orb">
            <Sparkles />
          </div>
          <div className="research-header-title-group">
            <h1>AI Research Assistant</h1>
            <div className="research-header-status">
              <span className="research-status-dot" />
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="research-header-actions">
          <button className="research-header-btn" title="Search conversations">
            <Search />
          </button>
          <button className="research-header-btn research-new-chat-btn" onClick={handleNewChat} title="New Chat">
            <Plus />
            <span>New Chat</span>
          </button>
          <button
            className={`research-header-btn research-panel-toggle ${showPanel ? 'active' : ''}`}
            onClick={() => setShowPanel(!showPanel)}
            title="Toggle panel"
          >
            {showPanel ? <PanelRightClose /> : <PanelRightOpen />}
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="research-chat-body">
        <div className="research-chat-main">
          <div className="research-messages-scroll" ref={scrollRef}>
            {!hasMessages ? (
              /* ── EMPTY STATE ── */
              <div className="research-empty-state">
                <motion.div
                  className="research-empty-orb"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sparkles />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  What would you like to research today?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  Research companies, technologies, salaries, and industry trends using AI.
                </motion.p>
                <motion.div
                  className="research-suggestions-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  {SUGGESTIONS.map((s, i) => (
                    <div
                      key={i}
                      className="research-suggestion-card"
                      onClick={() => handleSend(s.query)}
                    >
                      <div className="research-suggestion-icon"><s.icon /></div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              /* ── MESSAGES ── */
              <div className="research-messages-container">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`research-message ${msg.role}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="research-msg-avatar">
                        {msg.role === 'assistant' ? <Sparkles size={15} /> : 'U'}
                      </div>
                      <div className="research-msg-bubble">
                        {msg.role === 'assistant' ? (
                          <div className="research-msg-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                        ) : (
                          <div className="research-msg-content">{msg.content}</div>
                        )}
                        <div className="research-msg-meta">
                          <span className="research-msg-time">{msg.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <div className="research-typing">
                    <div className="research-msg-avatar assistant">
                      <Sparkles size={15} color="white" />
                    </div>
                    <div className="research-typing-bubble">
                      <span className="research-typing-dot" />
                      <span className="research-typing-dot" />
                      <span className="research-typing-dot" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── INPUT ── */}
          <div className="research-input-area">
            <div className="research-input-wrapper">
              <div className="research-input-bar">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about careers, companies, or technologies…"
                  rows={1}
                  autoFocus
                />
                <div className="research-input-actions">
                  <button className="research-input-icon-btn" title="Voice input"><Mic /></button>
                  <button className="research-input-icon-btn" title="Attach file"><Paperclip /></button>
                  <button className="research-input-icon-btn" title="AI tools"><Zap /></button>
                  <button
                    className="research-send-btn"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    title="Send"
                  >
                    <Send />
                  </button>
                </div>
              </div>
              <p className="research-input-disclaimer">AI can make mistakes. Please verify important information.</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        {showPanel && (
          <motion.aside
            className="research-right-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recent Chats */}
            <div className="research-panel-section">
              <h3><Clock size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />Recent Chats</h3>
              {conversations.length === 0 ? (
                <p style={{ fontSize: '0.72rem', color: '#5a5a72' }}>No conversations yet</p>
              ) : (
                conversations.slice(0, 5).map(c => (
                  <div key={c.id} className="research-panel-card" onClick={() => loadConversation(c)}>
                    <h4>{c.title}</h4>
                    <p>{new Date(c.updatedAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>

            {/* Suggested Prompts */}
            <div className="research-panel-section">
              <h3><Bookmark size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />Suggested Prompts</h3>
              {PANEL_PROMPTS.map((p, i) => (
                <div key={i} className="research-panel-prompt" onClick={() => handleSend(p)}>{p}</div>
              ))}
            </div>

            {/* Trending */}
            <div className="research-panel-section">
              <h3><TrendingUp size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />Trending Topics</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {TRENDING.map((t, i) => (
                  <span key={i} className="research-trending-tag" onClick={() => handleSend(`Tell me about ${t} and its career impact.`)}>{t}</span>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
};

export default Research;

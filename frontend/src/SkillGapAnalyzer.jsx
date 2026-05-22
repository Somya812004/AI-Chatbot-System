import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Search, FileText, UserCheck, Map, Bookmark, Settings, 
  ChevronRight, Upload, Brain, Target, BarChart3, Zap, ShieldCheck, 
  Cpu, Database, Cloud, Code2, MessageSquare, Send, Bell
} from 'lucide-react';
import './SkillGapAnalyzer.css';

const SkillGapAnalyzer = ({ userName, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('skill-gap');

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'skill-gap', icon: Target, label: 'Skill Gap Analyzer' },
    { id: 'resume', icon: FileText, label: 'Resume Analyzer' },
    { id: 'mock-interview', icon: UserCheck, label: 'Mock Interviews' },
    { id: 'ats', icon: ShieldCheck, label: 'ATS Checker' },
    { id: 'roadmaps', icon: Map, label: 'AI Roadmaps' },
    { id: 'saved', icon: Bookmark, label: 'Saved Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const stats = [
    { label: 'Overall Readiness', value: '72%', status: 'Good', icon: Brain, color: '#a855f7' },
    { label: 'Skill Match', value: '68%', status: 'Moderate', icon: Zap, color: '#3b82f6' },
    { label: 'Missing Skills', value: '12', status: 'High Priority', icon: Database, color: '#f43f5e' },
    { label: 'Strength Areas', value: '8', status: 'Core Competency', icon: ShieldCheck, color: '#10b981' },
    { label: 'Weak Areas', value: '5', status: 'Requires Effort', icon: BarChart3, color: '#f59e0b' },
    { label: 'ATS Score', value: '84', status: 'Optimized', icon: Code2, color: '#22d3ee' },
  ];

  const missingSkills = [
    { name: 'Deep Learning', priority: 'High', icon: Cpu },
    { name: 'PyTorch', priority: 'High', icon: Zap },
    { name: 'MLOps', priority: 'Mid', icon: Cloud },
    { name: 'System Design', priority: 'Mid', icon: LayoutDashboard },
    { name: 'SQL Optimization', priority: 'Mid', icon: Database },
  ];

  const roadmapSteps = [
    { title: 'Build Foundations', desc: 'Master core CS fundamentals & math for AI', duration: '2 Weeks' },
    { title: 'Core Skills', desc: 'Focus on advanced algorithms and ML basics', duration: '4 Weeks' },
    { title: 'Advanced Tools', desc: 'Deep dive into PyTorch, TensorFlow & MLOps', duration: '6 Weeks' },
    { title: 'Real World Projects', desc: 'Build and deploy 3 production-grade AI projects', duration: '4 Weeks' },
    { title: 'Interview Readiness', desc: 'Technical mock interviews & behavioral prep', duration: '2 Weeks' },
    { title: 'Placement Ready', desc: 'Resume finalization & hiring process pipeline', duration: 'Go Time!' },
  ];

  const handleNavClick = (id) => {
    if (id === 'dashboard') {
      setCurrentView('dashboard');
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="sga-root">
      <div className="sga-bg-effects">
        <div className="sga-grid-overlay"></div>
        <div className="sga-ambient-glow"></div>
        <div className="sga-ambient-glow-2"></div>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className="sga-sidebar">
        <div className="sga-sidebar-logo" onClick={() => setCurrentView('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="sga-logo-orb" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="sga-logo-text">PathForge AI</span>
        </div>

        <nav className="sga-nav-list">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`sga-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sga-sidebar-footer">
          <div className="sga-user-card">
            <div className="sga-user-avatar">{userName ? userName[0].toUpperCase() : 'U'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{userName || 'User'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--sga-text-dim)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                AI Assistant Online
              </div>
            </div>
            <Bell size={18} color="var(--sga-text-dim)" />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="sga-main">
        {/* Hero */}
        <section className="sga-hero">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Skill Gap <span className="gradient-text">Analyzer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare your profile against industry requirements and discover your personalized placement roadmap.
          </motion.p>
        </section>

        {/* Control Bar */}
        <motion.div 
          className="sga-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="sga-analyze-btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--sga-border)', boxShadow: 'none' }}>
            <Upload size={18} />
            Upload Resume
          </button>

          <div className="sga-control-group">
            <label>Target Role</label>
            <select className="sga-select">
              <option>AI Engineer</option>
              <option>Software Engineer</option>
              <option>Data Scientist</option>
              <option>DevOps Engineer</option>
            </select>
          </div>

          <div className="sga-control-group">
            <label>Experience</label>
            <select className="sga-select">
              <option>Fresher</option>
              <option>Intermediate (1-3y)</option>
              <option>Senior (5y+)</option>
            </select>
          </div>

          <div className="sga-control-group">
            <label>Domain</label>
            <select className="sga-select">
              <option>Big Tech / FAANG</option>
              <option>Startup</option>
              <option>FinTech</option>
            </select>
          </div>

          <button className="sga-analyze-btn">
            <Brain size={18} />
            Analyze Now
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="sga-stats-grid">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="sga-stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            >
              <div className="sga-stat-icon" style={{ color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className="sga-stat-label">{stat.label}</div>
              <div className="sga-stat-value">{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: stat.color }}>{stat.status}</div>
            </motion.div>
          ))}
        </div>

        {/* Panels Row */}
        <div className="sga-panels-row">
          {/* Missing Skills */}
          <motion.div 
            className="sga-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3><Zap size={20} color="var(--sga-neon-purple)" /> Top Missing Skills</h3>
            {missingSkills.map((skill, idx) => (
              <div key={idx} className="sga-skill-row">
                <div className="sga-skill-icon"><skill.icon size={20} /></div>
                <div className="sga-skill-info">
                  <div className="sga-skill-name">{skill.name}</div>
                  <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '8px' }}>
                    <div style={{ height: '100%', width: idx % 2 === 0 ? '70%' : '40%', background: 'var(--sga-accent)', borderRadius: '10px' }}></div>
                  </div>
                </div>
                <div className={`sga-priority-badge ${skill.priority === 'High' ? 'sga-priority-high' : 'sga-priority-mid'}`}>
                  {skill.priority}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Visual Intelligence / Radar Chart Placeholder */}
          <motion.div 
            className="sga-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3><BarChart3 size={20} color="var(--sga-neon-blue)" /> Visual Intelligence</h3>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               {/* Radar Chart Mockup */}
               <div style={{ 
                 width: '240px', height: '240px', margin: '0 auto',
                 border: '1px solid rgba(168, 85, 247, 0.2)',
                 borderRadius: '50%', position: 'relative',
                 background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)'
               }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '50%' }}></div>
                  
                  {/* Axis lines */}
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: '120px', height: '1px', background: 'rgba(255,255,255,0.05)', transformOrigin: '0 0', transform: `rotate(${deg}deg)` }}></div>
                  ))}

                  {/* The actual "data" polygon */}
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <polygon 
                      points="120,40 180,90 190,160 120,200 60,160 50,90" 
                      fill="rgba(168, 85, 247, 0.2)" 
                      stroke="var(--sga-neon-purple)" 
                      strokeWidth="2" 
                    />
                  </svg>

                  <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: '700' }}>Programming</div>
                  <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: '700' }}>Deployment</div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Roadmap */}
        <motion.section 
          className="sga-roadmap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="sga-roadmap-header">
            <h3><Map size={24} color="var(--sga-neon-blue)" /> Personalized Improvement Roadmap</h3>
          </div>
          
          <div className="sga-timeline">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="sga-timeline-step">
                <div className="sga-step-node">{idx + 1}</div>
                <div className="sga-step-info">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                  <div className="sga-step-duration">{step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Floating Chat */}
      <div className="sga-chat-fixed">
        <motion.div 
          className="sga-chat-bar"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MessageSquare size={20} color="var(--sga-neon-purple)" />
          <input type="text" placeholder="Paste your resume or ask for a detailed skill analysis..." />
          <button><Send size={20} /></button>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;

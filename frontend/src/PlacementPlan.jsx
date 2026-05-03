import React, { useEffect } from 'react';

const PlacementPlan = ({ userName, assistantProps }) => {
  return (
    <div className="chat-focused-layout">
      {/* ── Header ── */}
      <header className="minimal-chat-header">
        <h1>{userName} | AI Resume Assistant</h1>
      </header>

      {/* ── Chat Messages ── */}
      <div className="chat-viewport">
        <div className="chat-scroll-container">
          {assistantProps.messages.map((msg, index) => {
            const content = msg?.content || '';
            const isResume = msg.role === 'assistant' && (content.includes('<h1') || content.includes('<h2'));
            const resumeId = `resume-${index}`;

            return (
              <div key={index} className={`chat-row ${msg.role === 'user' ? 'user' : 'assistant'}`}>
                <div className="chat-bubble">
                  <div id={isResume ? resumeId : undefined} className="bubble-body" dangerouslySetInnerHTML={{ __html: content }} />
                  
                  {isResume && (
                    <div className="resume-actions">
                      <button className="download-pdf-btn" onClick={() => assistantProps.handleDownloadPDF(resumeId)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                        Download Resume PDF
                      </button>
                    </div>
                  )}

                  <div className="bubble-meta">
                    <span>12:{30 + index} PM</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {assistantProps.isLoading && (
            <div className="chat-row assistant">
              <div className="chat-bubble typing">
                <div className="typing-animation">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={assistantProps.messagesEndRef} />
        </div>
      </div>

      {/* ── Bottom Input Area ── */}
      <div className="fixed-input-container">
        <div className="centered-input-wrapper">
          <div className="chat-input-bar">
            <textarea 
              ref={assistantProps.textareaRef}
              className="auto-resize-textarea"
              placeholder={`Message AI Resume Assistant...`} 
              value={assistantProps.input}
              onChange={(e) => {
                assistantProps.setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  assistantProps.handleSendMessage(e);
                  e.target.style.height = 'auto';
                }
              }}
              rows={1}
              autoFocus
            />
            <button className="icon-send-btn" onClick={(e) => {
              assistantProps.handleSendMessage(e);
              if (assistantProps.textareaRef?.current) {
                assistantProps.textareaRef.current.style.height = 'auto';
              }
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
          <p className="tiny-disclaimer">AI can make mistakes. Please verify important information.</p>
        </div>
      </div>
    </div>
  );
};

export default PlacementPlan;

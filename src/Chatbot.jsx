import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Chatbot.module.css';
import { findAnswer } from '../../data/chatData';

const WELCOME_MSG = {
  from: 'bot',
  text: "✈️ Hi! I'm your Travel Explorer assistant. Ask me about destinations, blogs, booking, or anything about the site!",
  link: null,
  linkText: null,
};

export default function Chatbot() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef               = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    // Simulate bot "thinking"
    setTimeout(() => {
      const match = findAnswer(trimmed);

      const botReply = match
        ? { from: 'bot', text: match.answer, link: match.link, linkText: match.linkText }
        : {
            from: 'bot',
            text: "🔍 I don't have information on that yet. Try searching our destinations or contact us directly!",
            link: '/contact',
            linkText: 'Contact Us →',
          };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([WELCOME_MSG]);
    setInput('');
  };

  return (
    <div className={styles.wrapper}>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className={styles.chatWindow}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.botAvatar}>✈</div>
              <div>
                <span className={styles.botName}>Travel Assistant</span>
                <span className={styles.botStatus}>● Online</span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close chat">✕</button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.message} ${msg.from === 'user' ? styles.userMsg : styles.botMsg}`}>
                {msg.from === 'bot' && <div className={styles.msgAvatar}>✈</div>}
                <div className={styles.msgContent}>
                  <p className={styles.msgText}>{msg.text}</p>
                  {msg.link && (
                    <Link
                      to={msg.link}
                      className={styles.msgLink}
                      onClick={() => setIsOpen(false)}
                    >
                      {msg.linkText}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className={`${styles.message} ${styles.botMsg}`}>
                <div className={styles.msgAvatar}>✈</div>
                <div className={styles.typingBubble}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions */}
          <div className={styles.suggestions}>
            {['Sharm El Sheikh', 'Book a trip', 'Blog articles', 'Contact us'].map((s) => (
              <button key={s} className={styles.suggBtn} onClick={() => { setInput(s); }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              className={styles.inputField}
            />
            <button
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>

        </div>
      )}

      {/* ── Floating Bubble ── */}
      <button
        className={`${styles.bubble} ${isOpen ? styles.bubbleOpen : ''}`}
        onClick={() => setIsOpen((p) => !p)}
        aria-label="Open chat assistant"
      >
        {isOpen ? '✕' : '✈'}
        {!isOpen && <span className={styles.bubblePulse} />}
      </button>

    </div>
  );
}

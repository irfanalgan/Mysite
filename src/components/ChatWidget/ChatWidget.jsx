import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGE = { role: 'assistant', text: "Merhaba! Ben İrfan Kaan Algan'ın portfolyo asistanıyım. İş deneyimi, projeleri, becerileri veya eğitimi hakkında her şeyi sorabilirsin." };
const MAX_MESSAGES = 20;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    setMsgCount(0);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (msgCount >= MAX_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: trimmed },
        { role: 'assistant', text: 'Mesaj limitine ulaştın. Daha fazla soru için irfanalgan@gmail.com adresinden İrfan ile iletişime geçebilirsin.' },
      ]);
      setInput('');
      return;
    }

    const userMsg = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setMsgCount((c) => c + 1);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.text,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply ?? 'Bir sorun oluştu.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Bağlantı hatası. Lütfen tekrar dene.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const limitReached = msgCount >= MAX_MESSAGES;

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">İ</div>
              <div>
                <p className="chat-name">İrfan's Assistant</p>
                <p className="chat-status">● Online</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-clear" onClick={handleClear} title="Sohbeti temizle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21M8 6V4H16V6M19 6L18.2 19C18.1 20.1 17.2 21 16.1 21H7.9C6.8 21 5.9 20.1 5.8 19L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble bot chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder={limitReached ? 'Mesaj limitine ulaşıldı' : 'Bir şeyler sor...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || limitReached}
            />
            <button className="chat-send" onClick={handleSend} disabled={isLoading || limitReached}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;

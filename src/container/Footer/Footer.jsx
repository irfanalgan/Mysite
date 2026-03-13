import React, { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';

const contactInfo = [
  { icon: HiMail,            label: 'Email',    value: 'irfanalgan@gmail.com',  href: 'mailto:irfanalgan@gmail.com' },
  { icon: HiPhone,           label: 'Phone',    value: '+90 (543) 887-7600',    href: 'tel:+905438877600' },
  { icon: HiLocationMarker,  label: 'Location', value: 'Ankara, Turkey',      href: null },
];

const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!username || !email || !message) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://formspree.io/f/mwvrbdqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: username, email, message }),
      });

      if (res.ok) {
        setIsFormSubmitted(true);
      } else {
        setError('Failed to send. Please reach out directly at irfanalgan@gmail.com');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">
        Let's <span style={{ color: 'var(--secondary-color)' }}>Connect</span>
      </h2>
      <p className="p-text app__footer-subtitle">
        Open to new opportunities, collaborations, and interesting conversations.
      </p>

      <div className="app__footer-content">

        <div className="app__footer-info">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div className="app__footer-info-item" key={label}>
              <div className="app__footer-info-icon"><Icon /></div>
              <div>
                <p className="app__footer-info-label">{label}</p>
                {href
                  ? <a href={href} className="app__footer-info-value">{value}</a>
                  : <p className="app__footer-info-value">{value}</p>
                }
              </div>
            </div>
          ))}
        </div>

        {!isFormSubmitted ? (
          <div className="app__footer-form">
            <div className="app__footer-form-row">
              <div className="app__footer-field">
                <label className="app__footer-label">Name</label>
                <input type="text" name="username" value={username} onChange={handleChangeInput} placeholder="Your name" />
              </div>
              <div className="app__footer-field">
                <label className="app__footer-label">Email</label>
                <input type="email" name="email" value={email} onChange={handleChangeInput} placeholder="your@email.com" />
              </div>
            </div>
            <div className="app__footer-field">
              <label className="app__footer-label">Message</label>
              <textarea name="message" value={message} onChange={handleChangeInput} placeholder="What's on your mind?" />
            </div>
            {error && <p className="app__footer-error">{error}</p>}
            <button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        ) : (
          <div className="app__footer-success">
            <div className="app__footer-success-icon">✓</div>
            <h3>Message sent!</h3>
            <p className="p-text">Thank you for reaching out. I'll get back to you shortly.</p>
          </div>
        )}

      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);

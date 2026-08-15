import React, { useState } from 'react';
import { crtAudio } from '../utils/crtAudio';

export default function TransmitSection() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [copied, setCopied] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const links = [
    {
      id: 'email',
      label: 'EMAIL',
      hoverText: 'EMAIL → rewatiramansingh01@proton.me',
      url: 'mailto:rewatiramansingh01@proton.me',
      isCopy: true,
      emailStr: 'rewatiramansingh01@proton.me',
    },
    {
      id: 'github',
      label: 'GITHUB',
      hoverText: 'github.com/ramanrewati',
      url: 'https://github.com/ramanrewati',
      isCopy: false,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      hoverText: 'linkedin.com/in/rewati-raman-singh',
      url: 'https://www.linkedin.com/in/rewati-raman-singh-377025259/',
      isCopy: false,
    },
    {
      id: 'discord',
      label: 'DISCORD',
      hoverText: 'DISCORD → wearyostrich',
      url: 'https://discord.com',
      isCopy: true,
      emailStr: 'wearyostrich',
    },
  ];

  const handleLinkClick = (link, e) => {
    crtAudio.playChannelZip();
    if (link.isCopy) {
      e.preventDefault();
      navigator.clipboard.writeText(link.emailStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      window.location.href = link.url;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = '[ error: please enter your name ]';
    }
    if (!formData.email.trim()) {
      newErrors.email = '[ error: please enter your email ]';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '[ error: please enter a valid email address ]';
    }
    if (!formData.message.trim()) {
      newErrors.message = '[ error: message cannot be empty ]';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      crtAudio.playChannelZip();
      return;
    }

    setStatus('submitting');
    crtAudio.playChannelZip();

    try {
      const res = await fetch('https://formsubmit.co/ajax/rewatiramansingh01@proton.me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Transmission from ${formData.name}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        crtAudio.playChannelZip();
      } else {
        window.location.href = `mailto:rewatiramansingh01@proton.me?subject=Portfolio%20Transmission%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        setStatus('success');
      }
    } catch (err) {
      window.location.href = `mailto:rewatiramansingh01@proton.me?subject=Portfolio%20Transmission%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setStatus('success');
    }
  };

  return (
    <section
      id="ping"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Section Header - Centered */}
      <div
        className="reveal-on-scroll"
        style={{
          marginBottom: 'var(--space-xl, 2.618rem)',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto var(--space-xl, 2.618rem) auto',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-xs, 12px)',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-xs, 0.382rem)',
          }}
        >
          CONTACT
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'var(--font-size-h2, clamp(2.2rem, 4.236vw, 4.236rem))',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 0 var(--space-sm, 0.618rem) 0',
          }}
        >
          ping me here
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-base, 14px)',
            color: 'var(--color-signal-grey)',
          }}
        >
          if you're building something difficult, weird, useful, or all three.
        </p>
      </div>

      {/* Main Content Layout Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* FIRST: CRT Contact Form in Middle */}
        <div
          className="reveal-on-scroll"
          style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: 'rgba(12, 14, 18, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: 'var(--space-lg, 1.618rem)',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-warning-red)',
              letterSpacing: '0.1em',
              marginBottom: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-warning-red)', boxShadow: '0 0 6px var(--color-warning-red)' }} />
            DIRECT MESSAGE
          </div>

          {status === 'success' ? (
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(0, 255, 102, 0.05)',
                border: '1px solid rgba(0, 255, 102, 0.3)',
                color: '#00ff66',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              [ TRANSMISSION_SENT ]
              <br />
              Your message has been transmitted directly to Rewati's inbox.
              <br />
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: '1rem',
                  color: 'var(--color-phosphor-white)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '6px 12px',
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                SEND ANOTHER TRANSMISSION →
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmitMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="your name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: errors.name ? '1px solid var(--color-warning-red)' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: errors.name ? '0 0 8px rgba(255, 42, 42, 0.4)' : 'none',
                    color: 'var(--color-phosphor-white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-warning-red)', marginTop: '4px' }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="your email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: errors.email ? '1px solid var(--color-warning-red)' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: errors.email ? '0 0 8px rgba(255, 42, 42, 0.4)' : 'none',
                    color: 'var(--color-phosphor-white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                {errors.email && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-warning-red)', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="your message here..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: errors.message ? '1px solid var(--color-warning-red)' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: errors.message ? '0 0 8px rgba(255, 42, 42, 0.4)' : 'none',
                    color: 'var(--color-phosphor-white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
                {errors.message && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-warning-red)', marginTop: '4px' }}>
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-phosphor-white)',
                  backgroundColor: status === 'submitting' ? 'rgba(255, 42, 42, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '12px 18px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-warning-red)';
                  e.currentTarget.style.color = 'var(--color-warning-red)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = 'var(--color-phosphor-white)';
                }}
              >
                {status === 'submitting' ? 'transmitting...' : 'transmit message →'}
              </button>
            </form>
          )}
        </div>

        {/* SECOND: Sleek Centered Social Links Below Form (Not Big Card Buttons) */}
        <div
          className="reveal-on-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.2rem',
            marginTop: 'var(--space-xl, 2.618rem)',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {links.map((link, idx) => (
            <React.Fragment key={link.id}>
              {idx > 0 && <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>//</span>}
              <a
                href={link.url}
                target={link.isCopy ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(link, e)}
                onMouseEnter={() => {
                  setHoveredLink(link.id);
                  crtAudio.playChannelZip();
                }}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: hoveredLink === link.id ? 'var(--color-warning-red)' : 'var(--color-signal-grey)',
                  borderBottom: hoveredLink === link.id ? '1px solid var(--color-warning-red)' : '1px solid transparent',
                  padding: '4px 6px',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>[{link.id === 'email' && copied ? 'COPIED TO CLIPBOARD!' : link.label}]</span>
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Nicely Positioned Ambient Rooftop TV Antenna Graphic on the Right */}
      <div
        className="antenna-graphic-container"
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 5vw, 5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.45,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/antenna.png`}
          alt="Outdoor rooftop CRT television antenna receiving broadcast signal"
          loading="lazy"
          decoding="async"
          style={{
            height: 'clamp(280px, 50vh, 520px)',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 16px rgba(0, 255, 102, 0.2)) drop-shadow(0 0 35px rgba(0,0,0,0.95))',
          }}
        />
      </div>
    </section>
  );
}

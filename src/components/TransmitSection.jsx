import React, { useState } from 'react';
import { crtAudio } from '../utils/crtAudio';

export default function TransmitSection() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [copied, setCopied] = useState(false);

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
      hoverText: 'GITHUB → github.com/ramanrewati',
      url: 'https://github.com/ramanrewati',
      isCopy: false,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      hoverText: 'LINKEDIN → linkedin.com/in/rewati-raman-singh-377025259',
      url: 'https://www.linkedin.com/in/rewati-raman-singh-377025259/',
      isCopy: false,
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

  return (
    <section
      id="ping"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Section Header */}
      <div className="reveal-on-scroll" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          CONTACT
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 0 1rem 0',
          }}
        >
          ping me here
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--color-signal-grey)',
            maxWidth: '620px',
          }}
        >
          if you're building something difficult, weird, useful, or all three.
        </p>
      </div>

      {/* Links Container */}
      <div
        className="reveal-on-scroll"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '650px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {links.map((link) => (
          <a
            key={link.id}
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
              fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)',
              color: hoveredLink === link.id ? 'var(--color-warning-red)' : 'var(--color-phosphor-white)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: hoveredLink === link.id ? 'rgba(255, 42, 42, 0.05)' : 'rgba(255, 255, 255, 0.01)',
              padding: '1.2rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: hoveredLink === link.id ? '0 0 15px rgba(255, 42, 42, 0.25)' : 'none',
              wordBreak: 'break-word',
            }}
          >
            <span>{hoveredLink === link.id ? link.hoverText : link.label}</span>
            <span style={{ fontSize: '12px', color: 'var(--color-signal-grey)', flexShrink: 0, marginLeft: '8px' }}>
              {link.id === 'email' && copied ? 'COPIED TO CLIPBOARD!' : '→'}
            </span>
          </a>
        ))}
      </div>

      {/* Outdoor Rooftop TV Antenna Graphic on the Right */}
      <div
        className="antenna-graphic-container"
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 7vw, 7rem)',
          bottom: '1rem',
          top: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/antenna.png`}
          alt="Outdoor Rooftop TV Antenna"
          loading="lazy"
          decoding="async"
          style={{
            height: 'clamp(240px, 44vh, 480px)',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 12px rgba(0, 255, 102, 0.15)) drop-shadow(0 0 30px rgba(0,0,0,0.9))',
            opacity: 0.92,
          }}
        />
      </div>
    </section>
  );
}

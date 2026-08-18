import React from 'react';
import { crtAudio } from '../utils/crtAudio';

const NAV_TABS = [
  { id: 'work', number: '01', label: 'WORK' },
  { id: 'things', number: '02', label: 'THINGS' },
  { id: 'about', number: '03', label: 'OFFLINE' },
  { id: 'frequencies', number: '04', label: 'LAST PLAYED' },
  { id: 'ping', number: '05', label: 'CONTACT' },
];

export default function HeroSection({ onNavigate }) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 60px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background Image - Bright, Sharp & Visible Face */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 10%',
          opacity: 0.75,
          filter: 'brightness(110%) contrast(115%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle vignette overlay to keep text legible while preserving face clarity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(7, 8, 10, 0.75) 0%, rgba(7, 8, 10, 0.25) 50%, rgba(7, 8, 10, 0.65) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle bottom gradient & soft blur transition edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(to bottom, rgba(12, 14, 18, 0.35) 40%, rgba(12, 14, 18, 0.8) 75%, var(--color-crt-screen, #0c0e12) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Tagline descriptor block */}
      <div
        className="hero-tagline-block"
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 12vh, 7.5rem)',
          right: 'clamp(1.5rem, 8vw, 14vw)',
          zIndex: 10,
          textAlign: 'left',
          maxWidth: '340px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-signal-grey)',
            marginBottom: '6px',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
          }}
        >
          fueled by heuristics
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-phosphor-white)',
            lineHeight: 1.5,
          }}
        >
          freelance / AI / scalable & compliant systems
        </div>
      </div>

      {/* Main Name Typography - Adaptable across all aspect ratios */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
          marginBottom: 0,
          marginLeft: '-0.2rem',
          maxWidth: '100%',
        }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, min(9.5vw, 12.5vh), var(--font-size-h1, 6.854rem))',
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            margin: 0,
            textTransform: 'uppercase',
            color: 'rgba(227, 230, 225, 0.95)',
            textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 0 10px rgba(227, 230, 225, 0.3)',
            wordBreak: 'break-word',
          }}
        >
          REWATI
          <br />
          RAMAN
          <br />
          SINGH
        </h1>
      </div>

      {/* Right Centre Vertical Navigation Tabs (Desktop: Right-Center, Mobile: Bottom Action Strip) */}
      <nav
        aria-label="Section navigation"
        className="hero-nav-tabs"
        style={{
          position: 'absolute',
          top: '52%',
          right: 'clamp(1.5rem, 5vw, 4rem)',
          transform: 'translateY(-50%)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          width: 'clamp(128px, 12vw, 148px)',
        }}
      >
        {NAV_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate?.(tab.id)}
            onMouseEnter={() => {
              crtAudio.playSubtleFlickerSound();
            }}
            className="hero-tab-button"
            aria-label={`Navigate to ${tab.label} section`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-phosphor-white)',
              backgroundColor: 'rgba(12, 14, 18, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              padding: '7px 11px',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '3px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-warning-red)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 42, 42, 0.12)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.35)';
              e.currentTarget.style.transform = 'translateX(-3px)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.backgroundColor = 'rgba(12, 14, 18, 0.75)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.color = 'var(--color-phosphor-white)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', color: 'var(--color-signal-grey)' }}>
                {tab.number}
              </span>
              <span style={{ fontWeight: 600 }}>{tab.label}</span>
            </div>
            <span
              style={{
                color: 'var(--color-warning-red)',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              ↓
            </span>
          </button>
        ))}
      </nav>
    </section>
  );
}

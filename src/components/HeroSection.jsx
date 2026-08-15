import React from 'react';

export default function HeroSection({ onExploreClick }) {
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
          background: 'linear-gradient(to bottom, rgba(12, 14, 18, 0) 0%, rgba(12, 14, 18, 0.35) 40%, rgba(12, 14, 18, 0.8) 75%, var(--color-crt-screen, #0c0e12) 100%)',
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
          marginBottom: '0',
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

      {/* Footer / Call To Action Above The Fold */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-sm, 0.618rem)',
          marginTop: 'var(--space-lg, 1.618rem)',
        }}
      >
        <button
          onClick={onExploreClick}
          aria-label="Explore work section"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-sm, 13px)',
            color: 'var(--color-phosphor-white)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backgroundColor: 'rgba(12, 14, 18, 0.6)',
            padding: '10px 20px',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-warning-red)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.35)';
            e.currentTarget.style.color = 'var(--color-warning-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.color = 'var(--color-phosphor-white)';
          }}
        >
          EXPLORE WORK ↓
        </button>
      </div>
    </section>
  );
}

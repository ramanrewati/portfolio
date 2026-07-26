import React from 'react';

export default function RomeSection() {
  return (
    <section
      id="rome"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 6rem) clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Roman Statue with Aggressive Flat Red Eye Censorship Bar */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(260px, 45vw, 480px)',
          margin: '2rem auto 3rem auto',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/roman_statue.jpg`}
          alt="Classical Roman Marble Bust"
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'contrast(135%) brightness(85%) grayscale(100%)',
          }}
        />

        {/* Aggressive Flat Red Eye Censorship Bar */}
        <div
          style={{
            position: 'absolute',
            top: '26%',
            left: '32%',
            width: '36%',
            height: '14px',
            backgroundColor: 'var(--color-warning-red)',
            boxShadow: '0 0 4px rgba(255, 42, 42, 0.6)',
            zIndex: 15,
          }}
        />
      </div>

      {/* Final Statement Typography */}
      <h2
        className="font-display text-phosphor"
        style={{
          fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
          fontWeight: 800,
          textTransform: 'lowercase',
          lineHeight: 1.05,
          maxWidth: '1000px',
          marginBottom: '4rem',
        }}
      >
        rome wasn't built in a day,
        <br />
        <span style={{ color: 'var(--color-warning-red)' }}>but this website was.</span>
      </h2>

      {/* Small Technical Footer */}
      <footer
        style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-signal-grey)',
        }}
      >
        <div>REWATI RAMAN SINGH</div>
        <div>NO RIGHTS RESERVED / STEAL THIS SITE</div>
      </footer>
    </section>
  );
}

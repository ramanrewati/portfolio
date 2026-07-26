import React from 'react';

export default function OfflineSection() {
  return (
    <section
      id="about"
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
          OFFLINE
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          apart from tech
        </h2>
      </div>

      {/* Grid of Hobbies */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {/* GYM */}
        <div
          className="reveal-on-scroll"
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/gym.png`}
            alt="Gym training"
            loading="lazy"
            decoding="async"
            style={{
              height: '280px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'contrast(110%) brightness(95%)',
              display: 'block',
            }}
          />

          <div style={{ padding: '1.5rem' }}>
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                margin: 0,
              }}
            >
              GYM
            </h3>
          </div>
        </div>

        {/* CRICKET */}
        <div
          className="reveal-on-scroll"
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/cricket.jpg`}
            alt="Cricket match"
            loading="lazy"
            decoding="async"
            style={{
              height: '280px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'contrast(120%) brightness(90%)',
              display: 'block',
            }}
          />

          <div style={{ padding: '1.5rem' }}>
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                margin: 0,
              }}
            >
              CRICKET
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

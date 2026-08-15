import React, { useState } from 'react';

export default function ThingsSection() {
  const [showLieAnnotation, setShowLieAnnotation] = useState(false);

  return (
    <section
      id="things"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: 'var(--space-xl, 2.618rem)' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-xs, 12px)',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-xs, 0.382rem)',
          }}
        >
          THINGS
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'var(--font-size-h2, clamp(2.2rem, 4.236vw, 4.236rem))',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          things i love
        </h2>
      </div>

      {/* Playful Large Statements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {/* Item 1 */}
        <div
          style={{
            borderLeft: '1px dashed rgba(255, 255, 255, 0.2)',
            paddingLeft: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          <h3
            className="font-display text-phosphor"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.5rem',
              lineHeight: 1.1,
              textTransform: 'none',
            }}
          >
            Building scalable systems
          </h3>
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              color: 'var(--color-signal-grey)',
              marginBottom: '1.5rem',
              textTransform: 'none',
            }}
          >
            & the design choices behind them
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--color-signal-grey)',
              maxWidth: '720px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              lineHeight: 1.7,
            }}
          >
            <p>I like the point where something stops being a prototype and starts becoming a system.</p>
            <p>What happens when there are ten streams instead of one? What blocks? What breaks first? What should be asynchronous? What actually needs the expensive model?</p>
            <p style={{ color: 'var(--color-phosphor-white)', fontWeight: 500 }}>
              The architecture around intelligence is usually as interesting as the intelligence itself.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div
          style={{
            borderLeft: '1px dashed rgba(255, 255, 255, 0.2)',
            paddingLeft: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          <h3
            className="font-display text-phosphor"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              lineHeight: 1.1,
              textTransform: 'none',
            }}
          >
            Someone trusting my hypothesis
          </h3>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--color-signal-grey)',
              maxWidth: '650px',
              lineHeight: 1.7,
            }}
          >
            There is something dangerously motivating about someone saying:
            <br />
            <span
              style={{
                color: 'var(--color-warning-red)',
                fontSize: '16px',
                fontWeight: 700,
                display: 'inline-block',
                margin: '8px 0',
              }}
            >
              "yeah, try it."
            </span>
            <br />
            Especially when the idea might fail.
          </div>
        </div>

        {/* Item 3 */}
        <div
          onMouseEnter={() => setShowLieAnnotation(true)}
          style={{
            borderLeft: '1px dashed rgba(255, 255, 255, 0.2)',
            paddingLeft: 'clamp(1rem, 3vw, 2rem)',
            position: 'relative',
          }}
        >
          <h3
            className="font-display text-phosphor"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.5rem',
              lineHeight: 1.1,
              textTransform: 'none',
            }}
          >
            Delivering good things under pressure
          </h3>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--color-warning-red)',
              marginTop: '1rem',
              transition: 'opacity 0.4s',
              opacity: showLieAnnotation ? 1 : 0.6,
            }}
          >
            `that might be a lie`
          </div>
        </div>
      </div>
    </section>
  );
}

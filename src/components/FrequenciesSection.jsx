import React from 'react';

export default function FrequenciesSection() {
  const topics = [
    {
      id: 'f1',
      title: 'F1',
      text: 'Engineering at 300 km/h, questionable strategy calls and an unreasonable attachment to milliseconds.'
    },
    {
      id: 'privacy',
      title: 'PRIVACY',
      text: 'What systems know, what they should know, and whether collecting something just because we can was ever a good idea.'
    },
    {
      id: 'popculture',
      title: 'POP CULTURE',
      text: "The internet's shared hallucination. Films, music, memes, celebrities, trends and whatever everyone collectively decides to obsess over this week."
    },
    {
      id: 'tech',
      title: 'TECH',
      text: 'Obviously. Systems, AI, models, infrastructure, design decisions and occasionally spending three hours fixing something caused by one line of configuration.'
    }
  ];

  return (
    <section
      id="frequencies"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '4rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          FREQUENCIES
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
          things that can derail a conversation
        </h2>
      </div>

      {/* Topics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.015)',
              padding: '1.8rem',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-warning-red)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                marginBottom: '0.8rem',
              }}
            >
              {topic.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-signal-grey)',
                lineHeight: 1.65,
              }}
            >
              {topic.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';

export default function RomeSection() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const HAS_VISITED_KEY = 'rrs_unique_visitor_flag';
    const COUNT_KEY = 'rrs_unique_visitor_count_v2';
    const API_READ = 'https://api.counterapi.dev/v1/ramanrewati-unique-visitors/visits';
    const API_HIT = 'https://api.counterapi.dev/v1/ramanrewati-unique-visitors/visits/up';

    const hasVisited = localStorage.getItem(HAS_VISITED_KEY);
    let storedCount = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10);

    if (!hasVisited) {
      // First time unique visitor: set flag and increment once
      localStorage.setItem(HAS_VISITED_KEY, 'true');
      storedCount += 1;
      localStorage.setItem(COUNT_KEY, storedCount.toString());
      if (isMounted) setVisitorCount(storedCount);

      fetch(API_HIT)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data && (data.count !== undefined || data.value !== undefined)) {
            const val = data.count !== undefined ? data.count : data.value;
            setVisitorCount(val);
            localStorage.setItem(COUNT_KEY, val.toString());
          }
        })
        .catch(() => {});
    } else {
      // Returning visitor / Refresh: DO NOT INCREMENT. Read existing count only.
      if (isMounted) setVisitorCount(storedCount);

      fetch(API_READ)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data && (data.count !== undefined || data.value !== undefined)) {
            const val = data.count !== undefined ? data.count : data.value;
            setVisitorCount(val);
            localStorage.setItem(COUNT_KEY, val.toString());
          }
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, []);

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
          margin: 'var(--space-lg, 1.618rem) auto var(--space-xl, 2.618rem) auto',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/roman_statue.jpg`}
          alt="Classical Roman Marble Bust with red eye censorship bar"
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
          fontSize: 'var(--font-size-h2, clamp(2.2rem, 4.236vw, 4.236rem))',
          fontWeight: 800,
          textTransform: 'lowercase',
          lineHeight: 1.05,
          maxWidth: '1000px',
          marginBottom: 'var(--space-xl, 2.618rem)',
        }}
      >
        rome wasn't built in a day,
        <br />
        <span style={{ color: 'var(--color-warning-red)' }}>but this website was.</span>
      </h2>

      {/* Discreet Working Visitor Counter */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '3px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-size-xs, 11px)',
          color: 'var(--color-signal-grey)',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-xl, 2.618rem)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#00ff66',
            boxShadow: '0 0 6px #00ff66',
            display: 'inline-block',
          }}
        />
        <span>
          VISITORS: {visitorCount !== null ? visitorCount.toLocaleString() : '0'}
        </span>
      </div>

      {/* Small Technical Footer */}
      <footer
        style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-lg, 1.618rem)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-size-xs, 11px)',
          color: 'var(--color-signal-grey)',
        }}
      >
        <div>REWATI RAMAN SINGH</div>
        <div>NO RIGHTS RESERVED / STEAL THIS SITE</div>
      </footer>
    </section>
  );
}

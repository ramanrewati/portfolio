import React from 'react';
import { RefreshCw } from 'lucide-react';
import { crtAudio } from '../utils/crtAudio';

export default function ShutdownScreen({ onReboot }) {
  const handleRebootClick = () => {
    crtAudio.playBootIgnition();
    onReboot();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#040406',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-phosphor-white)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 800,
          letterSpacing: '0.05em',
          color: 'var(--color-warning-red)',
          textShadow: '0 0 20px rgba(255, 42, 42, 0.6)',
          marginBottom: '1rem',
          animation: 'crtGlitchShift 0.2s infinite alternate',
        }}
      >
        NO SIGNAL
      </div>

      <div
        style={{
          fontSize: '13px',
          color: 'var(--color-signal-grey)',
          letterSpacing: '0.15em',
          marginBottom: '3rem',
        }}
      >
        TRANSMISSION ENDED / FREQUENCY 15.75 KHZ
      </div>

      <button
        onClick={handleRebootClick}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--color-phosphor-white)',
          border: '1px solid var(--color-warning-red)',
          backgroundColor: 'rgba(255, 42, 42, 0.1)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(255, 42, 42, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <RefreshCw size={16} />
        REBOOT TRANSMISSION
      </button>
    </div>
  );
}

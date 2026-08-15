import React, { useState } from 'react';
import { Volume2, VolumeX, RefreshCw, Zap } from 'lucide-react';
import { crtAudio } from '../utils/crtAudio';

export default function Navbar({ onReboot, onTriggerFlicker }) {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const muted = crtAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 850,
        padding: '24px 36px 10px 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto' }}>
        {/* Experimental CRT Flicker Button */}
        {onTriggerFlicker && (
          <button
            onClick={onTriggerFlicker}
            title="Trigger Experimental Flicker (Once)"
            style={{
              color: 'var(--color-signal-grey)',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(12, 14, 18, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              backdropFilter: 'blur(8px)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffb703';
              e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 183, 3, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-signal-grey)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Zap size={13} style={{ color: '#ffb703' }} />
            <span>FLICKER</span>
          </button>
        )}

        {/* Audio Toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          style={{
            color: 'var(--color-signal-grey)',
            padding: '7px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(12, 14, 18, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-phosphor-white)';
            e.currentTarget.style.borderColor = 'var(--color-warning-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-signal-grey)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* CRT Reboot Button */}
        <button
          onClick={onReboot}
          title="Reboot CRT"
          style={{
            color: 'var(--color-signal-grey)',
            padding: '7px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(12, 14, 18, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-phosphor-white)';
            e.currentTarget.style.borderColor = 'var(--color-warning-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-signal-grey)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <RefreshCw size={15} />
        </button>
      </div>
    </header>
  );
}

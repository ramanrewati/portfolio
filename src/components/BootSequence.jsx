import React, { useEffect, useState } from 'react';
import { crtAudio } from '../utils/crtAudio';

export default function BootSequence({ onComplete }) {
  const [stage, setStage] = useState('initial'); // 'initial', 'line', 'flash', 'static', 'done'

  useEffect(() => {
    // Stage 1: Line expand (0ms - 400ms)
    crtAudio.playBootIgnition();
    setStage('line');

    const timer1 = setTimeout(() => {
      // Stage 2: Ignition Flash (400ms - 700ms)
      setStage('flash');
    }, 450);

    const timer2 = setTimeout(() => {
      // Stage 3: Static & Vertical Hold Distortion (700ms - 1300ms)
      setStage('static');
    }, 700);

    const timer3 = setTimeout(() => {
      // Stage 4: Fade to Signal Locked (1400ms)
      setStage('done');
      if (onComplete) onComplete();
    }, 1350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050507',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      {stage === 'line' && (
        <div
          className="boot-line-expand"
          style={{
            background: '#ffffff',
            boxShadow: '0 0 20px #ffffff, 0 0 40px #ffffff',
          }}
        />
      )}

      {stage === 'flash' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            opacity: 0.9,
          }}
        />
      )}

      {stage === 'static' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `repeating-radial-gradient(circle at 50% 50%, #fff 0, #000 2px, #fff 4px, #000 6px)`,
            opacity: 0.85,
            filter: 'contrast(200%) brightness(150%)',
            animation: 'crtGlitchShift 0.08s infinite alternate',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              color: '#00ff66',
            }}
          >
            ACQUIRING SIGNAL... 15.75KHZ
          </div>
        </div>
      )}
    </div>
  );
}

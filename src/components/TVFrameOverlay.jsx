import React from 'react';

export default function TVFrameOverlay() {
  // Bulged CRT Screen Aperture Path
  const crtAperturePath = `
    M 65,35 
    Q 500,12 935,35 
    Q 965,35 965,65 
    Q 988,500 965,935 
    Q 965,965 935,965 
    Q 500,988 65,965 
    Q 35,965 35,935 
    Q 12,500 35,65 
    Q 35,35 65,35 Z
  `;

  // Full Screen Outer Box Path
  const outerBoxPath = `M 0,0 L 1000,0 L 1000,1000 L 0,1000 Z`;

  return (
    <div className="crt-tv-frame-overlay-container">
      {/* SVG Pure Black TV Bezel & Bright Glass Edge Rim */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 900,
        }}
      >
        <defs>
          {/* Bright CRT Edge Glass Glow Filter */}
          <filter id="brightEdgeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Hazy Outer Edge Blur */}
          <filter id="hazeBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Subtle Dark Refractive Rim Linear Gradient */}
          <linearGradient id="glassRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a918b" stopOpacity="0.35" />
            <stop offset="25%" stopColor="#3a3f3c" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#c5c9c3" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#252826" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#707671" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Solid Pure Black Outer TV Bezel Mask */}
        <path
          d={`${outerBoxPath} ${crtAperturePath}`}
          fill="#000000"
          fillRule="evenodd"
        />

        {/* Hazy Soft Edge Inner Shadow - restricted to bezel rim */}
        <path
          d={crtAperturePath}
          fill="none"
          stroke="rgba(0, 0, 0, 0.95)"
          strokeWidth="12"
          filter="url(#hazeBlur)"
        />

        {/* Subtle Dark Glass Reflection Rim on the bulged CRT Bezel */}
        <path
          d={crtAperturePath}
          fill="none"
          stroke="url(#glassRimGrad)"
          strokeWidth="1.8"
          filter="url(#brightEdgeGlow)"
          opacity="0.45"
        />

        {/* Secondary Low-Key Inner Phosphor Rim Line */}
        <path
          d={crtAperturePath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
      </svg>

      {/* Glass Blur Haze & Vignette Overlay */}
      <div className="crt-glass-haze-layer" />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

export default function CRTCanvas({ interferenceLevel = 0, isFlickering = false }) {
  const canvasRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isTabVisible = !document.hidden;

    // Canvas size setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Handle Page Visibility API (Pause completely when tab is backgrounded)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastFrameTime = performance.now();
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Physics State
    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.5,
      prevX: window.innerWidth * 0.5,
      prevY: window.innerHeight * 0.5,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
      opacity: 0,
      isInteractive: false,
      lastMoved: performance.now(),
    };

    // Glass Reflection Physics State
    const reflection = {
      x: window.innerWidth * 0.3,
      y: window.innerHeight * 0.2,
      vx: 0.15,
      vy: 0.1,
    };

    // Transient Phosphor Spark Particles
    const sparks = [];

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handlePointerMove = (e) => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
        mouse.lastMoved = performance.now();

        // Check if hovering over an interactive element
        const target = document.elementFromPoint(e.clientX, e.clientY);
        mouse.isInteractive = target ? !!target.closest('a, button, [role="button"], input, textarea, .reveal-on-scroll') : false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.isInteractive = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let frame = 0;
    let lastFrameTime = performance.now();

    // Render loop with high-refresh rate fluidity & smart idle throttling
    const render = () => {
      if (!isTabVisible) return;

      const now = performance.now();
      const timeSinceMouseMoved = now - mouse.lastMoved;
      const isIdle = timeSinceMouseMoved > 2500 && interferenceLevel === 0 && !isFlickering && !mouse.active && sparks.length === 0;

      // Frame rate throttling: Only throttle when fully idle
      const minInterval = isIdle ? 50 : 0;
      const elapsed = now - lastFrameTime;

      if (elapsed >= minInterval) {
        const dtMs = Math.min(48, Math.max(1, elapsed));
        const dt = dtMs / 16.667; // Normalized time step (1.0 at 60fps, 0.5 at 120fps)
        lastFrameTime = now;
        frame++;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Smooth Opacity Transition
        const targetOpacity = (!isTouch && mouse.active) ? 1 : 0;
        mouse.opacity += (targetOpacity - mouse.opacity) * Math.min(1, 0.22 * dt);

        // 1. Ultra-Responsive Zero-Lag Dynamic Tracking Physics
        const dx = mouse.targetX - mouse.x;
        const dy = mouse.targetY - mouse.y;
        const dist = Math.hypot(dx, dy);

        // Velocity-adaptive lerp factor: increases dynamically during fast sweeps so it never lags behind
        const lerpFactor = Math.min(0.96, (0.7 + Math.min(dist / 60, 0.26)) * Math.min(1.25, dt));
        mouse.x += dx * lerpFactor;
        mouse.y += dy * lerpFactor;

        // Instantaneous Velocity calculation with smoothing
        const instVx = (mouse.targetX - mouse.prevX) / Math.max(dt, 0.5);
        const instVy = (mouse.targetY - mouse.prevY) / Math.max(dt, 0.5);
        mouse.prevX = mouse.targetX;
        mouse.prevY = mouse.targetY;
        mouse.vx = mouse.vx * 0.6 + instVx * 0.4;
        mouse.vy = mouse.vy * 0.6 + instVy * 0.4;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);

        // Calculate refined compact radius
        const baseRadius = mouse.isInteractive ? 76 : 60;
        const radius = Math.min(95, baseRadius + mouse.speed * 0.3);
        const rSq = radius * radius;

        // Update physical backdrop lens element position & scale
        if (lensRef.current) {
          const diameter = radius * 2;
          lensRef.current.style.width = `${diameter}px`;
          lensRef.current.style.height = `${diameter}px`;
          lensRef.current.style.transform = `translate3d(${mouse.x - radius}px, ${mouse.y - radius}px, 0)`;
          lensRef.current.style.opacity = `${mouse.opacity}`;
        }

        // Spawn Phosphor Micro-Sparks on fast flicks
        if (mouse.active && mouse.speed > 8 && sparks.length < 16 && Math.random() < 0.38) {
          const angle = Math.random() * Math.PI * 2;
          const spawnDist = Math.random() * (radius * 0.5) + (radius * 0.2);
          const sparkColors = ['#ff2a3a', '#00ff88', '#38a8ff', '#ffffff'];
          sparks.push({
            x: mouse.x + Math.cos(angle) * spawnDist,
            y: mouse.y + Math.sin(angle) * spawnDist,
            vx: Math.cos(angle) * (1.2 + Math.random() * 2.0) - mouse.vx * 0.1,
            vy: Math.sin(angle) * (1.2 + Math.random() * 2.0) - mouse.vy * 0.1,
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
            life: 1.0,
            decay: 0.06 + Math.random() * 0.05,
            size: Math.random() < 0.35 ? 1.6 : 1.1,
          });
        }

        // 2. Environmental Glass Reflection Physics (Slow Moving Specular Gradient)
        reflection.x += (reflection.vx + (mouse.x - width * 0.5) * 0.0002) * dt;
        reflection.y += (reflection.vy + (mouse.y - height * 0.5) * 0.0002) * dt;

        if (reflection.x < 0 || reflection.x > width) reflection.vx *= -1;
        if (reflection.y < 0 || reflection.y > height) reflection.vy *= -1;

        const grad = ctx.createRadialGradient(
          reflection.x, reflection.y, 50,
          reflection.x, reflection.y, Math.max(width, height) * 0.6
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
        grad.addColorStop(0.5, 'rgba(180, 200, 220, 0.008)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // 3. CRT Magnetic Field & Distorted Bending RGB Pixel Matrix
        if (mouse.opacity > 0.01) {
          ctx.save();

          // (A) Motion Chromatic Aberration Wake (Directional RGB stretching)
          if (mouse.speed > 2) {
            const dragScale = Math.min(mouse.speed * 0.28, 12);
            const normVx = mouse.vx / (mouse.speed + 0.01);
            const normVy = mouse.vy / (mouse.speed + 0.01);

            // Lagging Red channel streak
            const redGrad = ctx.createRadialGradient(
              mouse.x - normVx * dragScale * 0.75, mouse.y - normVy * dragScale * 0.75, 0,
              mouse.x - normVx * dragScale * 0.75, mouse.y - normVy * dragScale * 0.75, 24
            );
            redGrad.addColorStop(0, `rgba(255, 42, 60, ${0.18 * mouse.opacity})`);
            redGrad.addColorStop(1, 'rgba(255, 42, 60, 0)');
            ctx.fillStyle = redGrad;
            ctx.beginPath();
            ctx.arc(mouse.x - normVx * dragScale * 0.75, mouse.y - normVy * dragScale * 0.75, 24, 0, Math.PI * 2);
            ctx.fill();

            // Leading Blue channel streak
            const blueGrad = ctx.createRadialGradient(
              mouse.x + normVx * dragScale * 0.35, mouse.y + normVy * dragScale * 0.35, 0,
              mouse.x + normVx * dragScale * 0.35, mouse.y + normVy * dragScale * 0.35, 20
            );
            blueGrad.addColorStop(0, `rgba(40, 160, 255, ${0.16 * mouse.opacity})`);
            blueGrad.addColorStop(1, 'rgba(40, 160, 255, 0)');
            ctx.fillStyle = blueGrad;
            ctx.beginPath();
            ctx.arc(mouse.x + normVx * dragScale * 0.35, mouse.y + normVy * dragScale * 0.35, 20, 0, Math.PI * 2);
            ctx.fill();
          }

          // (B) Bent Scanline Magnetic Flux Lines
          const scanlineStep = 10;
          for (let i = -radius; i <= radius; i += scanlineStep) {
            const arcY = mouse.y + i;
            if (arcY > 0 && arcY < height) {
              const distRatio = Math.abs(i) / radius;
              const arcSpan = Math.sqrt(Math.max(0, rSq - i * i));
              const curve = (1 - distRatio * distRatio) * (11 + Math.min(mouse.speed * 0.2, 8)) * Math.sin(frame * 0.05 + i * 0.08);

              // Red Chromatic scanline edge
              ctx.strokeStyle = `rgba(255, 45, 60, ${0.08 * (1 - distRatio) * mouse.opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(mouse.x - arcSpan, arcY - 0.7);
              ctx.quadraticCurveTo(mouse.x + mouse.vx * 0.12, arcY + curve - 0.7, mouse.x + arcSpan, arcY - 0.7);
              ctx.stroke();

              // Center Phosphor White scanline
              ctx.strokeStyle = `rgba(227, 230, 225, ${0.13 * (1 - distRatio) * mouse.opacity})`;
              ctx.beginPath();
              ctx.moveTo(mouse.x - arcSpan, arcY);
              ctx.quadraticCurveTo(mouse.x, arcY + curve, mouse.x + arcSpan, arcY);
              ctx.stroke();

              // Blue Chromatic scanline edge
              ctx.strokeStyle = `rgba(40, 160, 255, ${0.08 * (1 - distRatio) * mouse.opacity})`;
              ctx.beginPath();
              ctx.moveTo(mouse.x - arcSpan, arcY + 0.7);
              ctx.quadraticCurveTo(mouse.x - mouse.vx * 0.12, arcY + curve + 0.7, mouse.x + arcSpan, arcY + 0.7);
              ctx.stroke();
            }
          }

          // (C) Distorted Bending RGB Phosphor Subpixel Grid (Aperture Grille Triad Deflection)
          const gridStep = 6;
          const minX = Math.max(0, Math.floor((mouse.x - radius) / gridStep) * gridStep);
          const maxX = Math.min(width, Math.ceil((mouse.x + radius) / gridStep) * gridStep);
          const minY = Math.max(0, Math.floor((mouse.y - radius) / gridStep) * gridStep);
          const maxY = Math.min(height, Math.ceil((mouse.y + radius) / gridStep) * gridStep);
          const timePhase = frame * 0.06;

          for (let px = minX; px <= maxX; px += gridStep) {
            for (let py = minY; py <= maxY; py += gridStep) {
              const diffX = px - mouse.x;
              const diffY = py - mouse.y;
              const distSq = diffX * diffX + diffY * diffY;

              if (distSq < rSq) {
                const distP = Math.sqrt(distSq);
                const normDist = distP / radius;
                const warp = Math.pow(1 - normDist, 1.7);

                // Lorentz Magnetic Field Tangential Swirl + Radial Deflection
                const angle = Math.atan2(diffY, diffX);
                const swirlAngle = angle + (Math.PI * 0.5) * (1 - normDist * 0.35);

                const deflectMag = warp * (13 + Math.min(mouse.speed * 0.3, 9) + (mouse.isInteractive ? 6 : 0));
                const defX = Math.cos(swirlAngle) * deflectMag + Math.cos(angle) * (warp * 4.5);
                const defY = Math.sin(swirlAngle) * deflectMag + Math.sin(angle) * (warp * 4.5);

                // Directional Motion Stretch
                const velDrag = Math.min(mouse.speed * 0.2, 8) * warp;
                const vNormX = mouse.speed > 0.1 ? (mouse.vx / mouse.speed) : 0;
                const vNormY = mouse.speed > 0.1 ? (mouse.vy / mouse.speed) : 0;

                // Split Chromatic Subpixels (Red outward, Green center, Blue inward)
                const rx = px + defX * 1.3 - vNormX * velDrag * 0.6;
                const ry = py + defY * 1.3 - vNormY * velDrag * 0.6;

                const gx = px + defX * 1.0;
                const gy = py + defY * 1.0;

                const bx = px + defX * 0.7 + vNormX * velDrag * 0.6;
                const by = py + defY * 0.7 + vNormY * velDrag * 0.6;

                // Micro Phosphor Shimmer
                const shimmer = 0.8 + 0.2 * Math.sin(timePhase + px * 0.18 + py * 0.18);
                const subAlpha = warp * mouse.opacity * shimmer;

                if (subAlpha > 0.035) {
                  // Red Subpixel phosphor
                  ctx.fillStyle = `rgba(255, 45, 60, ${subAlpha * 0.8})`;
                  ctx.fillRect(rx - 1.0, ry - 1.2, 1.4, 2.4);

                  // Green Subpixel phosphor
                  ctx.fillStyle = `rgba(30, 255, 130, ${subAlpha * 0.9})`;
                  ctx.fillRect(gx - 1.0, gy - 1.2, 1.4, 2.4);

                  // Blue Subpixel phosphor
                  ctx.fillStyle = `rgba(40, 160, 255, ${subAlpha * 0.8})`;
                  ctx.fillRect(bx - 1.0, by - 1.2, 1.4, 2.4);
                }
              }
            }
          }

          // (D) Phosphor Core & Ambient Magnetic Halo
          const coreRadius = mouse.isInteractive ? 20 : 15;
          const coreGrad = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, coreRadius
          );
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.36 * mouse.opacity})`);
          coreGrad.addColorStop(0.4, `rgba(227, 230, 225, ${0.18 * mouse.opacity})`);
          coreGrad.addColorStop(0.8, `rgba(0, 255, 120, ${0.05 * mouse.opacity})`);
          coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, coreRadius, 0, Math.PI * 2);
          ctx.fill();

          // Sharp Hot-spot Cathode Ray Electron Beam
          ctx.fillStyle = `rgba(255, 255, 255, ${0.94 * mouse.opacity})`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Outer Magnetic Phosphor Halo
          const magGrad = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, radius
          );
          magGrad.addColorStop(0, `rgba(255, 255, 255, ${0.05 * mouse.opacity})`);
          magGrad.addColorStop(0.35, `rgba(255, 42, 42, ${0.04 * mouse.opacity})`);
          magGrad.addColorStop(0.68, `rgba(0, 255, 120, ${0.025 * mouse.opacity})`);
          magGrad.addColorStop(0.88, `rgba(40, 160, 255, ${0.015 * mouse.opacity})`);
          magGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = magGrad;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // (E) Render Transient Phosphor Sparks
          for (let i = sparks.length - 1; i >= 0; i--) {
            const sp = sparks[i];
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.vx *= 0.93;
            sp.vy *= 0.93;
            sp.life -= sp.decay * dt;

            if (sp.life <= 0) {
              sparks.splice(i, 1);
            } else {
              ctx.fillStyle = sp.color;
              ctx.globalAlpha = sp.life * mouse.opacity * 0.95;
              ctx.fillRect(sp.x - sp.size * 0.5, sp.y - sp.size * 0.5, sp.size, sp.size);
            }
          }
          ctx.globalAlpha = 1.0;

          ctx.restore();
        }

        // 4. Transient Noise Grain / Glitch Sync Burst
        if (interferenceLevel > 0 || Math.random() < 0.015) {
          const glitchHeight = Math.floor(Math.random() * 5) + 2;
          const glitchY = Math.floor(Math.random() * height);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + interferenceLevel * 0.1})`;
          ctx.fillRect(0, glitchY, width, glitchHeight);
        }

        // 5. Experimental Phosphor Beam Sweep Line
        if (isFlickering) {
          const sweepY = (frame * 24) % height;
          const lineGrad = ctx.createLinearGradient(0, sweepY - 10, 0, sweepY + 10);
          lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          lineGrad.addColorStop(0.5, 'rgba(227, 230, 225, 0.06)');
          lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = lineGrad;
          ctx.fillRect(0, sweepY - 10, width, 20);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.fillRect(0, sweepY, width, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interferenceLevel, isFlickering]);

  return (
    <>
      {/* HTTPS-Safe Procedural SVG Filter for CRT Magnetic Chromatic Lens Distortion */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="crtMagneticDistortion"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            {/* Pure procedural mathematical turbulence - works 100% on live HTTPS/Cloudflare/GitHub Pages */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.032 0.038"
              numOctaves="2"
              result="warpNoise"
              seed="5"
            />

            {/* Red Channel Physical Displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="warpNoise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="redDisplaced"
            />
            <feColorMatrix
              in="redDisplaced"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="redOnly"
            />

            {/* Green Channel Physical Displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="warpNoise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
              result="greenDisplaced"
            />
            <feColorMatrix
              in="greenDisplaced"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="greenOnly"
            />

            {/* Blue Channel Physical Displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="warpNoise"
              scale="-6"
              xChannelSelector="R"
              yChannelSelector="G"
              result="blueDisplaced"
            />
            <feColorMatrix
              in="blueDisplaced"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blueOnly"
            />

            {/* Re-composite split chromatic channels */}
            <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rgBlend" />
            <feBlend in="rgBlend" in2="blueOnly" mode="screen" result="chromaticWarp" />
          </filter>
        </defs>
      </svg>

      {/* Real-time Physical Magnetic Lens Distortion Layer */}
      <div ref={lensRef} className="crt-magnetic-lens" />

      {/* Canvas Shader Layer for Bent RGB Phosphor Subpixels, Scanlines & Cathode Core */}
      <canvas ref={canvasRef} className="crt-canvas-layer" />
    </>
  );
}




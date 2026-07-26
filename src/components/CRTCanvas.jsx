import React, { useEffect, useRef } from 'react';

export default function CRTCanvas({ interferenceLevel = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas size setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Physics State
    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.5,
      active: false,
      velocity: 0,
    };

    // Glass Reflection Physics State
    const reflection = {
      x: window.innerWidth * 0.3,
      y: window.innerHeight * 0.2,
      vx: 0.15,
      vy: 0.1,
    };

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handlePointerMove = (e) => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let frame = 0;

    // Render loop
    const render = () => {
      frame++;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth Physics Interpolation
      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;
      mouse.x += dx * 0.5;
      mouse.y += dy * 0.5;
      mouse.velocity = mouse.velocity * 0.8 + Math.sqrt(dx * dx + dy * dy) * 0.2;

      // 1. Environmental Glass Reflection Physics (Slow Moving Specular Gradient)
      reflection.x += reflection.vx + (mouse.x - width * 0.5) * 0.0002;
      reflection.y += reflection.vy + (mouse.y - height * 0.5) * 0.0002;

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

      // 2. Magnetic Pointer Field (Desktop only - soft hazy phosphor glow)
      if (!isTouch && mouse.active) {
        const radius = Math.min(120, 70 + mouse.velocity * 0.4);

        ctx.save();

        // Hazy Soft Phosphor Light Core
        const coreGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 28
        );
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        coreGrad.addColorStop(0.4, 'rgba(227, 230, 225, 0.1)');
        coreGrad.addColorStop(1, 'rgba(227, 230, 225, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
        ctx.fill();

        // Outer Phosphor Halo
        const magGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, radius
        );
        magGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        magGrad.addColorStop(0.4, 'rgba(255, 42, 42, 0.03)');
        magGrad.addColorStop(0.75, 'rgba(0, 255, 120, 0.015)');
        magGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = magGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Motion Arc Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = -radius; i <= radius; i += 16) {
          const arcY = mouse.y + i;
          if (arcY > 0 && arcY < height) {
            const dist = Math.abs(i) / radius;
            const curve = (1 - dist * dist) * 5 * Math.sin(frame * 0.06 + i * 0.08);
            ctx.beginPath();
            ctx.moveTo(mouse.x - Math.sqrt(radius * radius - i * i), arcY);
            ctx.quadraticCurveTo(mouse.x, arcY + curve, mouse.x + Math.sqrt(radius * radius - i * i), arcY);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 3. Transient Noise Grain / Glitch Sync Burst
      if (interferenceLevel > 0 || Math.random() < 0.015) {
        const glitchHeight = Math.floor(Math.random() * 5) + 2;
        const glitchY = Math.floor(Math.random() * height);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + interferenceLevel * 0.1})`;
        ctx.fillRect(0, glitchY, width, glitchHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interferenceLevel]);

  return <canvas ref={canvasRef} className="crt-canvas-layer" />;
}

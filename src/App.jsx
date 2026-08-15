import React, { useState, useEffect } from 'react';
import CRTCanvas from './components/CRTCanvas';
import BootSequence from './components/BootSequence';
import TVFrameOverlay from './components/TVFrameOverlay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import ThingsSection from './components/ThingsSection';
import OfflineSection from './components/OfflineSection';
import FrequenciesSection from './components/FrequenciesSection';
import TransmitSection from './components/TransmitSection';
import RomeSection from './components/RomeSection';
import ShutdownScreen from './components/ShutdownScreen';
import { crtAudio } from './utils/crtAudio';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [interference, setInterference] = useState(0);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);

  // Console Easter Egg
  useEffect(() => {
    console.log('%c signal acquired.', 'color: #00ff66; font-size: 14px; font-weight: bold;');
    console.log('%c welcome, curious person.', 'color: #8a918b; font-size: 12px;');
  }, []);

  // Trigger single subtle experimental flicker once
  const triggerExperimentalFlicker = () => {
    if (isFlickering) return;
    setIsFlickering(true);
    crtAudio.playSubtleFlickerSound();
    setTimeout(() => {
      setIsFlickering(false);
    }, 240);
  };

  // Auto-trigger single subtle flicker once after boot sequence completes
  useEffect(() => {
    if (!isBooting) {
      const timer = setTimeout(() => {
        triggerExperimentalFlicker();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    if (isBooting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isBooting]);

  // Smooth Scroll physics & Bottom Shutdown Detector
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;

      // Proportional signal interference on scroll velocity
      const velocityInterference = Math.min(0.35, deltaY * 0.006);
      if (velocityInterference > 0.01) {
        setInterference((prev) => Math.max(prev, velocityInterference));
      }

      const scrollPosition = currentY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      // Check if reached absolute bottom for CRT shutdown effect
      if (totalHeight - scrollPosition < 15 && !isShutdown) {
        crtAudio.playShutdownSound();
        setIsShutdown(true);
      } else if (totalHeight - scrollPosition > 120 && isShutdown) {
        setIsShutdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isShutdown]);

  // Decays signal interference only when active (stops RAF when 0 to conserve compute)
  useEffect(() => {
    if (interference <= 0) return;
    const animFrameId = requestAnimationFrame(() => {
      setInterference((prev) => (prev > 0.008 ? prev * 0.82 : 0));
    });
    return () => cancelAnimationFrame(animFrameId);
  }, [interference]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReboot = () => {
    setIsShutdown(false);
    setIsBooting(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="crt-television-frame">
      {/* Boot Sequence Overlay */}
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}

      {/* CRT Shutdown Overlay */}
      {isShutdown && <ShutdownScreen onReboot={handleReboot} />}

      {/* Real-time CRT Canvas Shader & Magnetic Cursor Layer (Viewport Pinned) */}
      <CRTCanvas interferenceLevel={interference} isFlickering={isFlickering} />

      {/* Statically Pinned Bulged Pure Black TV Frame & Glowing Glass Overlay */}
      <TVFrameOverlay />

      {/* Outer Bezels & CRT Enclosure Inner Screen */}
      <div className={`crt-bezel-inner ${isFlickering ? 'crt-experimental-flicker-active' : ''}`}>
        {/* Scanlines Overlay */}
        <div className="crt-scanlines" />

        {/* RGB Phosphor Grid Texture */}
        <div className="crt-rgb-texture" />

        {/* Glass Reflection & Hazy Vignette Layer */}
        <div className="crt-glass-overlay" />

        {/* CRT Top Header Navbar */}
        <Navbar onReboot={handleReboot} onTriggerFlicker={triggerExperimentalFlicker} />

        {/* Main Content Stream */}
        <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <HeroSection onExploreClick={() => handleNavigate('work')} />
          <WorkSection />
          <ThingsSection />
          <OfflineSection />
          <FrequenciesSection />
          <TransmitSection />
          <RomeSection />
        </main>
      </div>
    </div>
  );
}

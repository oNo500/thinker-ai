'use client';

import { useEffect, useRef, useState } from 'react';

const particleImage = 'http://localhost:3845/assets/d00ec0e066bdc173b283f3d3f1d1d9c7db280811.svg';
const maskImage = 'http://localhost:3845/assets/c31512230b9182cd5df2c9a950b3ab0ccd20ae4b.svg';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        25% { transform: translateY(-10px) rotate(5deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(-3deg); opacity: 0.7; }
        75% { transform: translateY(-15px) rotate(2deg); opacity: 0.4; }
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .floating-particle {
        animation: float var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        will-change: transform, opacity;
      }
      
      .floating-particle.paused {
        animation-play-state: paused;
      }
      
      .gradient-bg {
        background: rgba(255, 255, 255, 1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Generate particle grid (13x3 = 39 particles)
  const particles = [];
  const cols = 13;
  const rows = 3;

  // Use deterministic values to avoid hydration mismatch
  const getDuration = (index: number) => {
    // Create predictable "random" values based on index
    const seed = (index * 9301 + 49297) % 233280;
    const pseudoRandom = seed / 233280;
    return 3 + pseudoRandom * 2; // 3-5 seconds
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      const delay = index * 0.1;
      const duration = getDuration(index);

      particles.push(
        <div
          key={`particle-${row}-${col}`}
          className={`floating-particle absolute h-[27px] w-[27px] opacity-30 ${!isVisible ? 'paused' : ''}`}
          style={
            {
              left: `${col * 8.3}%`,
              top: `${20 + row * 25}%`,
              '--delay': `${delay}s`,
              '--duration': `${duration}s`,
            } as React.CSSProperties
          }
        >
          <img src={particleImage} alt="" className="h-full w-full object-cover" />
        </div>,
      );
    }
  }

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} ref={containerRef}>
      {/* Main gradient background */}
      <div
        className="gradient-bg absolute inset-0 opacity-20 blur-3xl"
        style={{
          transform: 'scale(1.5)',
          filter: 'blur(80px)',
        }}
      />

      {/* Particle grid */}
      {/* <div className="absolute inset-0">{particles}</div> */}

      {/* Overlay with glassmorphism effect */}
      {/* <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
        }}
      /> */}
    </div>
  );
}

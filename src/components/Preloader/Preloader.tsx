import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './preloader.scss';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check the current theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const dataTheme = document.documentElement.getAttribute('data-theme');

    if (savedTheme === 'dark' || dataTheme === 'dark') {
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    if (!preloaderRef.current || !blackHoleRef.current || !ringRef.current) return;

    // Create particles
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'preloader-particle';

        // Random position around the black hole
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;

        // Random size
        const size = 1 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = (0.3 + Math.random() * 0.7).toString();

        particlesRef.current.appendChild(particle);
      }
    }

    // Initial animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    // Add a subtle glow effect to the black hole based on theme
    if (blackHoleRef.current) {
      const glowColor = isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
      gsap.set(blackHoleRef.current, {
        boxShadow: `0 0 0px ${glowColor}`
      });
    }

    // Animate black hole
    tl.fromTo(blackHoleRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        boxShadow: `0 0 30px ${isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
        duration: 1.5,
        ease: "power2.out"
      }
    );

    // Animate ring
    tl.fromTo(ringRef.current,
      { scale: 0, opacity: 0, rotation: 0 },
      {
        scale: 1,
        opacity: 0.7,
        rotation: 45,
        duration: 1,
        ease: "power2.out"
      },
      "-=1"
    );

    // Animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.preloader-particle');

      // Add a subtle glow to particles based on theme
      particles.forEach(particle => {
        const element = particle as HTMLElement;
        if (isDarkTheme) {
          element.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
        } else {
          element.style.boxShadow = '0 0 3px rgba(0, 0, 0, 0.5)';
        }
      });

      tl.fromTo(particles,
        { opacity: 0, scale: 0 },
        {
          opacity: (i) => 0.3 + Math.random() * 0.7,
          scale: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: "power2.out"
        },
        "-=0.8"
      );

      // Add a subtle orbit animation before being sucked in
      tl.to(particles, {
        rotation: (i) => Math.random() * 360,
        duration: 1,
        ease: "none",
        stagger: {
          each: 0.02,
          from: "random"
        }
      });

      // Animate particles being sucked into the black hole
      tl.to(particles, {
        left: "50%",
        top: "50%",
        opacity: 0,
        scale: 0,
        duration: 1.5,
        stagger: 0.01,
        ease: "power3.in"
      });
    }

    // Final black hole pulse with enhanced glow
    tl.to(blackHoleRef.current, {
      scale: 1.2,
      boxShadow: `0 0 50px ${isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}`,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Add a flash of light
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    flash.style.zIndex = '2';
    flash.style.opacity = '0';
    preloaderRef.current?.appendChild(flash);

    tl.to(flash, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.in"
    });

    tl.to(flash, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "+=0.1");

    // Final collapse
    tl.to(blackHoleRef.current, {
      scale: 0,
      opacity: 0,
      boxShadow: `0 0 0px ${isDarkTheme ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)'}`,
      duration: 0.8,
      ease: "power3.in"
    }, "-=0.3");

    // Clean up
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-content">
        <div className="preloader-black-hole" ref={blackHoleRef}></div>
        <div className="preloader-ring" ref={ringRef}></div>
        <div className="preloader-particles" ref={particlesRef}></div>
      </div>
    </div>
  );
};

export default Preloader;
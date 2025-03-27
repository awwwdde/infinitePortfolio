import React, { useState, useEffect } from 'react';
import './CustomCursor.scss';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    // Add fade-in animation for cursor
    const cursorElements = document.querySelectorAll('.cursor-blob, .cursor-invert-circle');
    if (cursorElements.length) {
      gsap.fromTo(cursorElements,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    handleLinkHoverEvents();

    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  if (windowWidth <= 768) {
    return null;
  }

  return (
    <>
      <div
        className={`cursor-blob ${clicked ? 'clicked' : ''} ${linkHovered ? 'link-hovered' : ''} ${hidden ? 'hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path className="blob-path" d="M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 Z">
            <animate
              attributeName="d"
              dur="5000ms"
              repeatCount="indefinite"
              values="
                M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 Z;

                M50,20 C70,15 80,30 75,50 C70,70 60,80 50,80 C35,80 20,70 25,50 C30,30 35,25 50,20 Z;

                M50,15 C65,15 85,25 85,50 C85,70 70,85 50,85 C30,85 15,75 15,50 C15,30 30,15 50,15 Z;

                M50,20 C60,20 75,25 80,50 C85,70 70,80 50,80 C30,80 15,70 20,50 C25,25 35,20 50,20 Z;

                M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 Z"
              keyTimes="0;0.25;0.5;0.75;1"
            />
          </path>
        </svg>
      </div>
      <div
        className={`cursor-invert-circle ${clicked ? 'clicked' : ''} ${linkHovered ? 'link-hovered' : ''} ${hidden ? 'hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;
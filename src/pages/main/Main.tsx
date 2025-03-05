import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './main.scss';

export const Main = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createBreathAnimation = (element: HTMLElement) => {
      gsap.fromTo(element,
        {
          opacity: 0.92,
          y: -1.5
        },
        {
          opacity: 0.98,
          y: 1.5,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        }
      );
    };

    if (titleRef.current) createBreathAnimation(titleRef.current);
    if (subtitleRef.current) createBreathAnimation(subtitleRef.current);

  }, []);

  return (
    <div className="main">
      <div className="main-block">
        <div className="main-block-title" ref={titleRef}>infinite.</div>
        <div className="main-block-subtitle" ref={subtitleRef}>
          updating, please wait
        </div>
      </div>
    </div>
  );
};

export default Main;
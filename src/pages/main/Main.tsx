import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './main.scss';

export const Main = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Анимация для основного заголовка
    if (titleRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(titleRef.current,
        { opacity: 0.8, y: -5 },
        {
          opacity: 1,
          y: 5,
          duration: 4,
          ease: "power1.inOut",
        }
      ).to(titleRef.current, {
        opacity: 0.8,
        y: -5,
        duration: 4,
        ease: "power1.inOut",
      });
    }

    // Анимация для субтитла
    if (subtitleRef.current) {
      const tlSubtitle = gsap.timeline({ repeat: -1 });
      tlSubtitle.fromTo(subtitleRef.current,
        { opacity: 0.8, y: -5 },
        {
          opacity: 1,
          y: 5,
          duration: 4,
          ease: "power1.inOut",
        }
      ).to(subtitleRef.current, {
        opacity: 0.8,
        y: -5,
        duration: 4,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div className="main">
      <div className="main-block">
        <div className="main-block-title" ref={titleRef}>infinite.</div>
        <div className="main-block-subtitle" ref={subtitleRef}>
          updating
        </div>
      </div>
    </div>
  );
};

export default Main;
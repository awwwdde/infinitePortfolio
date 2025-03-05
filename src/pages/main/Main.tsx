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

    // Анимация для субтитла с эффектом пульсации
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        opacity: 0.3,
        scale: 0.95,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        repeatDelay: 0.5
      });

      // Дополнительная анимация точек
      const dots = subtitleRef.current.querySelectorAll('span');
      gsap.fromTo(dots, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.5,
        repeat: -1,
        repeatDelay: 1,
        ease: "power2.inOut"
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
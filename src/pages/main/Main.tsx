import './main.scss';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Создаем таймлайн для анимации
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Анимация заголовка
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );
    
    // Небольшая анимация буквы i
    tl.fromTo(
      accentRef.current,
      { scale: 1 },
      { 
        scale: 1.05, 
        duration: 0.5, 
        repeat: 1, 
        yoyo: true,
        delay: 0.2 
      },
      "-=0.5"
    );
    
    // Плавное движение заголовка
    gsap.to(titleRef.current, {
      x: 5,
      y: -5,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5
    });
    
    return () => {
      // Очистка анимаций при размонтировании компонента
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(accentRef.current);
    };
  }, []);

  return (
    <div className="main">
      <div className={`main-block ${isVisible ? 'visible' : ''}`}>
        <div className="main-block-title" ref={titleRef}>
          <span className="main-block-title-text font-black">
            infin<span className="main-block-title-accent font-black" ref={accentRef}>i</span><span className="font-black">t</span><span className="font-black">e</span>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
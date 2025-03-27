import './main.scss';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);

    if (titleRef.current && titleTextRef.current) {
      gsap.set(titleTextRef.current, {
        opacity: 0,
        y: 10
      });

      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "power2.out",
          duration: 0.8
        }
      });

      tl.to(titleTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      });

      gsap.to(titleRef.current, {
        y: 10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(titleRef.current, {
        x: 8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
    }
  }, []);

  return (
    <div className="main">
      <div className={`main-block ${isVisible ? 'visible' : ''}`}>
        <div className="main-block-title" ref={titleRef}>
          <span className="main-block-title-text font-black" ref={titleTextRef}>
            infin<span className="main-block-title-accent font-black">i</span><span className="font-black">t</span><span className="font-black">e</span>.
          </span>
        </div>
      </div>

      <div className={`main-block-manifesto bottom-left ${isVisible ? 'visible' : ''}`}>
        <p>
          {t('manifesto.text')}
        </p>
      </div>
    </div>
  );
};

export default Main;
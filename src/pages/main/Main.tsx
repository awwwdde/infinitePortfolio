import './main.scss';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import FadeIn from '../../components/FadeIn';

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNickname, setShowNickname] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();


  const processText = (text: string): string => {
    const primaryName = t('name.primary');
    const alternateName = t('name.alternate');
    const nickname = t('name.nickname');


    const primaryRegex = new RegExp(primaryName, 'gi');
    const alternateRegex = new RegExp(alternateName, 'gi');

    if (showNickname) {
      return text
        .replace(primaryRegex, `<span class="name-animation">${nickname}</span>`)
        .replace(alternateRegex, `<span class="name-animation">${nickname}</span>`);
    } else {
      return text
        .replace(new RegExp(nickname, 'gi'), `<span class="name-animation">${primaryName}</span>`)
        .replace(primaryRegex, `<span class="name-animation">${primaryName}</span>`)
        .replace(alternateRegex, `<span class="name-animation">${alternateName}</span>`);
    }
  };

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

    // Add fade-in animations for the content blocks
    if (manifestoRef.current) {
      gsap.fromTo(manifestoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.6, ease: "power2.out" }
      );
    }

    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: "power2.out" }
      );
    }

    const nameToggleInterval = setInterval(() => {
      gsap.to('.name-animation', {
        opacity: 0.3,
        duration: 1.2,
        ease: "power1.inOut",
        onComplete: () => {
          setShowNickname(prev => !prev);
          gsap.to('.name-animation', {
            opacity: 0.95,
            duration: 1.5,
            ease: "power1.out",
            delay: 0.1
          });
        }
      });
    }, 8000);

    return () => {
      clearInterval(nameToggleInterval);
    };
  }, []);
  useEffect(() => {
  }, [showNickname]);

  return (
    <div className="main">
      <div className={`main-block ${isVisible ? 'visible' : ''}`}>
        <div className="main-block-title" ref={titleRef}>
          <span className="main-block-title-text font-black" ref={titleTextRef}>
            infin<span className="main-block-title-accent font-black">i</span><span className="font-black">t</span><span className="font-black">e</span>.
          </span>
        </div>
      </div>

      <div className={`main-block-manifesto bottom-left ${isVisible ? 'visible' : ''}`} ref={manifestoRef}>
        <p dangerouslySetInnerHTML={{ __html: processText(t('manifesto.text')) }} />
      </div>

      <div className={`main-block-about top-right ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
        <p dangerouslySetInnerHTML={{ __html: processText(t('about.text')) }} />
      </div>
    </div>
  );
};

export default Main;
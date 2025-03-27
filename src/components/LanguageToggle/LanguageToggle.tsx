import React, { useEffect } from 'react';
import './LanguageToggle.scss';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Add fade-in animation
    const toggleButton = document.querySelector('.language-toggle');
    if (toggleButton) {
      gsap.fromTo(toggleButton,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className="language-toggle">
      <button
        className="language-toggle-button"
        onClick={toggleLanguage}
        aria-label={language === 'ru' ? 'Switch to English' : 'Переключиться на русский'}
      >
        {language === 'ru' ? 'EN' : 'RU'}
      </button>
    </div>
  );
};

export default LanguageToggle;
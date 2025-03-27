import React from 'react';
import './LanguageToggle.scss';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

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
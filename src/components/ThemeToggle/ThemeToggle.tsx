import React, { useEffect, useState } from 'react';
import './ThemeToggle.scss';
import gsap from 'gsap';

const ThemeToggle: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Add fade-in animation
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      gsap.fromTo(toggleButton,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    document.documentElement.setAttribute(
      'data-theme',
      newTheme ? 'dark' : 'light'
    );

    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="theme-toggle">
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={isDarkTheme ? 'Переключиться на светлую тему' : 'Переключиться на темную тему'}
      >
        {isDarkTheme ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.589 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73385 6.00945 9.85853 7.68141C9.98322 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6517 13.7866 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle; 
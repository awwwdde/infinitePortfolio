import React, { useState, useEffect } from 'react';
import './styles/styles.scss'
import Main from './pages/main/Main'
import Footer from './components/footer/footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Preloader from './components/Preloader';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [loading, setLoading] = useState(true);

  // Check if this is the first load or a page refresh
  useEffect(() => {
    // We always show the preloader on initial load
    setLoading(true);

    // Listen for page refreshes
    const handleBeforeUnload = () => {
      // Set a flag in sessionStorage to indicate a refresh is happening
      sessionStorage.setItem('pageRefreshing', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <LanguageProvider>
      <div className="app">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <ThemeToggle />
        <LanguageToggle />
        <Main />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

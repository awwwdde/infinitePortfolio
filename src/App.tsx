import React from 'react';
import './styles/styles.scss'
import Main from './pages/main/Main'
import Footer from './components/footer/footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <ThemeToggle />
        <LanguageToggle />
        <Main />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

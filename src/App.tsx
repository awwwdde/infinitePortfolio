import React from 'react';
import './styles/styles.scss'
import Main from './pages/main/Main'
import Footer from './components/footer/footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

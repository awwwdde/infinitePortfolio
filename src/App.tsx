import React from 'react';
import './styles/styles.scss'
import Main from './pages/main/Main'
import Fu from './components/footer/footer';

function App() {
  return (
    <div className="app">
      <Main />
      <Fu/>
    </div>
  );
}

export default App;

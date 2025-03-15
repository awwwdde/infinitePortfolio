import './main.scss';
import { useEffect, useState } from 'react';

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="main">
      <div className={`main-block ${isVisible ? 'visible' : ''}`}>
        <div className="main-block-title">infinite.</div>
      </div>
    </div>
  );
};

export default Main;
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
        <div className="main-block-title">
          <span className="main-block-title-text font-black">
            infin<span className="main-block-title-accent font-black">i</span>te.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
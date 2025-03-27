import './main.scss';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="main">
      <div className={`main-block ${isVisible ? 'visible' : ''}`}>
        <div className="main-block-title" ref={titleRef}>
          <span className="main-block-title-text font-black">
            infin<span className="main-block-title-accent font-black" ref={accentRef}>i</span><span className="font-black">t</span><span className="font-black">e</span>.
          </span>
        </div>
      </div>

      <div className={`main-block-manifesto bottom-left ${isVisible ? 'visible' : ''}`}>
        <p>
          {t('manifesto.text')}
        </p>
      </div>
    </div>
  );
};

export default Main;
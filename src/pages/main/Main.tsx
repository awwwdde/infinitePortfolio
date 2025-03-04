import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './main.scss';

export const Main = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 }); 
    tl.fromTo(titleRef.current, 
      { opacity: 0.8, y: -5 },
      {
        opacity: 1,
        y: 5,
        duration: 4,
        ease: "power1.inOut",
      }
    ).to(titleRef.current, {
      opacity: 0.8,
      y: -5,
      duration: 4,
      ease: "power1.inOut",
    });
    gsap.to(titleRef.current, {
      duration: 2,
      repeat: -1,
      ease: "sine.inOut",
      yoyo: true,
    });

  }, []);

  return (
    <div className="main">
        <div className="main-block">
            <div className="main-block-title" ref={titleRef}>infinite.</div>
        </div>
    </div>
  );
};
export default Main;
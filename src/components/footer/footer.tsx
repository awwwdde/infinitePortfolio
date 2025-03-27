import React, { useEffect } from 'react';
import styles from './Footer.module.scss';
import gsap from 'gsap';

export const Footer = () => {
  useEffect(() => {
    // Add fade-in animation
    const footer = document.querySelector(`.${styles.footerblock}`);
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power2.out" }
      );
    }
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.footerblock}>
        <div className={styles.footerblocklinks}>
          <a
            href="https://pinterest.com/awwwdde/"
            target="_blank"
            rel="noopener noreferrer">
            pntrst
          </a>
          <span className={styles.footerblocklinksdivider}>•</span>
          <a
            href="https://github.com/awwwdde"
            target="_blank"
            rel="noopener noreferrer">
            gthb
          </a>
          <span className={styles.footerblocklinksdivider}>•</span>
          <a
            href="https://t.me/awwddedev"
            target="_blank"
            rel="noopener noreferrer">
            tlgrm
          </a>
        </div>
        <div className={styles.footerblockcopyright}>
          © 2025. awwwdde.
        </div>
      </div>
    </div>
  );
};

export default Footer;
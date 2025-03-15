import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerblock}>
        <div className={styles.footerblocklinks}>
          <a 
            href="https://pinterest.com/awwwdde/"
            target="_blank"
            rel="noopener noreferrer">
            pinterest
          </a>
          <span className={styles.footerblocklinksdivider}>•</span>
          <a 
            href="https://github.com/awwwdde"
            target="_blank"
            rel="noopener noreferrer">
            github
          </a>
          <span className={styles.footerblocklinksdivider}>•</span>
          <a 
            href="https://t.me/awwddedev"
            target="_blank"
            rel="noopener noreferrer">
            telegram
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
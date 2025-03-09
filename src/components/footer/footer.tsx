import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () =>{
  
    
  return (
    <div className={styles.footer}>
      <div className={styles.footerblock}>
        <p className={styles.footerblocktitle}>infinite.</p>
        <div className={styles.footerblocklinks}>
            <a 
            href="https://pinterest.com/awwwdde/"
            target="_blank"
            rel="noopener noreferrer">
                pntrst.
            </a>
            <a 
            href="https://github.com/awwwdde"
            target="_blank"
            rel="noopener noreferrer">
                gthb.
            </a>
            <a 
            href="https://t.me/awwddedev"
            target="_blank"
            rel="noopener noreferrer">
                tlgrm.
            </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
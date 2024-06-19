import React from 'react';
import styles from './Footer.module.css'; 

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>DreamLib &copy; 2024. Все права защищены.</p>
      </div>
    </footer>
  );
}


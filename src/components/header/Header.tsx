import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { SearchModal } from '../SearchModal/SearchModal';
import AuthModal from '../Auth/AuthModal';

export const Header: React.FC = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); // Состояние модального окна аутентификации




  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setSearchModalOpen(false);
  };

  const handleAuthModalOpen = () => {
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <Link to='/' className={styles.navLink}>
          <img src="/logo_dark.png" alt="" width={150} height={75} />
        </Link>
        <div className={styles.navigationLinks}>
          <Link to="/catalog" className={styles.navLink}>Каталог</Link>
          <Link to="/top" className={styles.navLink}>Топы</Link>
          <button className={styles.searchButton} onClick={handleSearchClick}>Поиск</button>
        </div>
        <div className={styles.extraControls}>
          <button className={styles.bookmarksButton}>Закладки</button>
          <button className={styles.authenticationButton} onClick={handleAuthModalOpen}>Войти</button>
        </div>
      </header>
      <SearchModal isOpen={isSearchModalOpen} onClose={handleCloseModal} />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} /> {/* Передаем состояние и метод закрытия */}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { SearchModal } from '../SearchModal/SearchModal';
import AuthModal from '../Auth/AuthModal';

export const Header: React.FC = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    setIsAuthenticated(!!authData);
  }, []);

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setSearchModalOpen(false);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
    setIsAuthenticated(!!localStorage.getItem('authData'));
  };

  const handleLogout = () => {
    localStorage.removeItem('authData');
    setIsAuthenticated(false);
  };

  const handleBookmarksClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true); // Открыть модальное окно авторизации, если пользователь не авторизован
    } else {
      // Действия при нажатии на "Закладки", если пользователь авторизован
      // Например, переход на страницу закладок
    }
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
        {isAuthenticated ? (
          <button className={styles.authenticationButton} onClick={handleLogout}>Выйти</button>
        ) : (
          <button className={styles.authenticationButton} onClick={() => setAuthModalOpen(true)}>Войти</button>
        )}
      </div>
    </header>
    <div className={styles.mobileNav}>
      <Link to="/catalog" className={styles.navLink}>Каталог</Link>
      <Link to="/top" className={styles.navLink}>Топы</Link>
      <button className={styles.searchButton} onClick={handleSearchClick}>Поиск</button>
      <button className={styles.bookmarksButton} onClick={handleBookmarksClick}>Закладки</button>
    </div>
    <SearchModal isOpen={isSearchModalOpen} onClose={handleCloseModal} />
    <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
  </>
);


};

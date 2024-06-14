import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { SearchModal } from '../SearchModal/SearchModal';
import AuthModal from '../Auth/AuthModal';
import { BASE_URL } from '../utils/baseUrl';
import { LoginResponse } from '../../store/dreamLibInjects/auth';

export const Header: React.FC = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAddContentSubmenuOpen, setAddContentSubmenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(authData));
    }
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
    setUserInfo(null);
  };

  const handleBookmarksClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      <Link to="/bookmarks" className={styles.navLink}>Закладки</Link>
    }
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleAddContentClick = () => {
    setAddContentSubmenuOpen(!isAddContentSubmenuOpen);
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <Link to='/' className={styles.imageLink}>
          <img src="/logo_dark.png" alt="Logo" width={150} height={75} />
        </Link>
        <div className={styles.navigationLinks}>
          <Link to="/catalog" className={styles.navLink}>Каталог</Link>
          <Link to="/top" className={styles.navLink}>Топы</Link>
          <button className={styles.searchButton} onClick={handleSearchClick}>Поиск</button>
        </div>
        <div className={styles.extraControls}>
          {isAuthenticated ? (
            <div className={styles.profileContainer}>
              <img
                src={`${BASE_URL}${userInfo?.user.image}`}
                alt="Profile"
                className={styles.profileIcon}
                onClick={handleProfileMenuToggle}
              />
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <div className={styles.profileHeader}>
                    <img src={`${BASE_URL}${userInfo?.user.image}`} alt="Profile" className={styles.profileMenuIcon} />
                    <span>{userInfo?.user.username}</span>
                  </div>
                  <button className={styles.profileMenuItem} onClick={handleAddContentClick}>
                    Добавить контент
                    <span className={styles.addContentIcon}>{isAddContentSubmenuOpen ? '-' : '+'}</span>
                  </button>
                  {isAddContentSubmenuOpen && (
                    <>
                      <Link to="/add-title" className={styles.profileMenuSubItem}>Добавить тайтл</Link>
                      <Link to="/edit-title" className={styles.profileMenuSubItem}>Редактировать тайтл</Link>
                      <Link to="/add-chapter" className={styles.profileMenuSubItem}>Добавить главу</Link>
                    </>
                  )}
                  <button className={styles.profileMenuItem} onClick={handleLogout}>
                    <span className={styles.logoutText}>Выйти</span>
                    <span className={styles.logoutIcon}>⤫</span>
                  </button>
                </div>
              )}
            </div>
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

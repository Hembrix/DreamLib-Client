import React, { useState, useEffect, useRef } from 'react';
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
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setIsAuthenticated(true);
      setUserInfo(parsedAuthData);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
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


  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleAddContentClick = () => {
    setAddContentSubmenuOpen(!isAddContentSubmenuOpen);
  };

  const isAdmin = userInfo?.user.groups.includes('Админ');

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
            <div className={styles.profileContainer} ref={profileMenuRef}>
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
                  <button className={styles.profileMenuItem}>Закладки</button>
                  {isAdmin && (
                    <>
                      <button className={styles.profileMenuItem} onClick={handleAddContentClick}>
                        Добавить контент
                        <span className={styles.addContentIcon}>{isAddContentSubmenuOpen ? '-' : '+'}</span>
                      </button>
                      {isAddContentSubmenuOpen && (
                        <>
                          <Link to="/add-title" className={styles.profileMenuSubItem}>Добавить тайтл</Link>
                          <Link to="/edit-title" className={styles.profileMenuSubItem}>Редактировать тайтл</Link>
                          <Link to="/add-chapter" className={styles.profileMenuSubItem}>Добавить главу</Link>
                          <Link to="/delete-chapter" className={styles.profileMenuSubItem}>Удалить главу</Link>
                        </>
                      )}
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
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={handleCloseModal} />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </>
  );
};

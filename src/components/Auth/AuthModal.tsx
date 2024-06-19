import React, { useState } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import styles from './AuthModal.module.css'; 

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div className={styles.modal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {isRegister ? (
                <>
                  <h2>Регистрация</h2>
                  <RegisterForm onClose={onClose} />
                  <p>Уже есть учетная запись? </p>
                  <span className={styles.switchLink} onClick={toggleForm}>Авторизоваться</span>
                </>
              ) : (
                <>
                  <h2>Авторизация</h2>
                  <AuthForm onClose={onClose} />
                  <p>Нет учетной записи?</p>
                  <span className={styles.switchLink} onClick={toggleForm}>Зарегистрироваться</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;

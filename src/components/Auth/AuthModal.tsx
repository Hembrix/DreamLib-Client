import React, { useState } from 'react';
import AuthForm from './Login';
import RegisterForm from './Registration';

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
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          {isRegister ? (
            <>
              <h2>Регистрация</h2>
              <RegisterForm onClose={onClose} />
            </>
          ) : (
            <>
              <h2>Авторизация</h2>
              <AuthForm onClose={onClose} />
            </>
          )}
          <button onClick={toggleForm}>
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </div>
      </div>
    )
  );
};

export default AuthModal;

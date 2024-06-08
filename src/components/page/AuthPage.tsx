import React, { useState } from 'react';
import { RegisterForm } from '../Auth/Registration';
import { AuthForm } from '../Auth/Login';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      <button onClick={toggleForm}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
      {isRegister ? (
        <>
          <h2>Register</h2>
          <RegisterForm />
        </>
      ) : (
        <>
          <h2>Login</h2>
          <AuthForm />
        </>
      )}
    </div>
  );
};

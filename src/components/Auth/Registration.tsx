import React, { useState } from 'react';
import { useRegisterMutation } from '../../store/dreamLibInjects/auth';

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    setErrorMessage('');

    try {
      await register({ username, email, password }).unwrap();
      console.log('Registration successful');
      // Очистить поля после успешной регистрации
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Ошибка при регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>Register</button>
      {isError && <div>Ошибка при регистрации</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

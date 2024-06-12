import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRegisterMutation } from '../../store/dreamLibInjects/auth';
import styles from './RegisterForm.module.css'; // Подключаем модульные стили

const fixedSalt = '$2a$10$w6.wqJqDsGh9FQHI28BuXe';  // фиксированная соль

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, fixedSalt);
      console.log('Hashed Password:', hashedPassword);

      await register({ username, email, password: hashedPassword }).unwrap();
      console.log('Registration successful');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onClose();
    } catch (error) {
      console.error('Error during registration:', error);
      setIsError(true);
      setErrorMessage('Ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <input type="email" placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        <input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button type="submit" disabled={isLoading}>Регистрация</button>
      {isError && <div className={styles.error}>Ошибка при регистрации</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </form>
  );
};

export default RegisterForm;

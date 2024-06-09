import React, { useState } from 'react';
import { useRegisterMutation } from '../../store/dreamLibInjects/auth';

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (Password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    try {
      await register({ Username, Email, Password }).unwrap();
      console.log('Registration successful');
      // Очистить поля после успешной регистрации
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onClose(); // Закрываем модальное окно после успешной регистрации
    } catch (error) {
      console.error('Error during registration:', error);
      setIsError(true);
      setErrorMessage('Ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="Логин" value={Username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        <input type="Email" placeholder="Почта" value={Email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label> 
        <input type="Password" placeholder="Пароль" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        <input type="Password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>Регистрация</button>
      {isError && <div>Ошибка при регистрации</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default RegisterForm;

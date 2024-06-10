import React, { useState } from 'react';
import { useLoginMutation } from '../../store/dreamLibInjects/auth';

interface AuthFormProps {
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      await login({ username, password }).unwrap();
      console.log('Login successful');
      onClose(); // Закрываем модальное окно после успешной аутентификации
    } catch (error) {
      console.error('Error during login:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="Логин/Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>Авторизация</button>
      {isError && <div>Ошибка авторизации</div>}
    </form>
  );
};

export default AuthForm;

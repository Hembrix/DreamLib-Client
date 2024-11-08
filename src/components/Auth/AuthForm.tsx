import React, { useState } from 'react';
import { useLoginMutation } from '../../store/dreamLibInjects/auth';
import bcrypt from 'bcryptjs';

const fixedSalt = '$2a$10$w6.wqJqDsGh9FQHI28BuXe';

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
      const hashedPassword = bcrypt.hashSync(password, fixedSalt);

      const response = await login({ username, password: hashedPassword }).unwrap();
      localStorage.setItem('authData', JSON.stringify(response));
      onClose();
      window.location.reload();
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
      <button type="submit" disabled={isLoading}>Войти</button>
      {isError && <div>Ошибка авторизации</div>}
    </form>
  );
};

export default AuthForm;

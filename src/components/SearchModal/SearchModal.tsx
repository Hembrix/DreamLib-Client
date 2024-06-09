import React, { useState, useEffect } from 'react';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import styles from './SearchModal.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/baseUrl';
import { Title } from '../types/TitleListInterfaceTypes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery(''); // Сбрасываем состояние при закрытии модального окна
    }
  }, [isOpen]);

  const handleClose = () => {
    setSearchQuery(''); // Сбрасываем состояние поиска
    onClose(); // Вызываем onClose из пропсов
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {searchResults.map((result: Title, index) => (
              <Link to={`/comics/${result.titleSlug}`} key={index} className={styles.resultItem}>
                <img src={`${BASE_URL}${result.imagetitle}`} alt={result.title} />
                <div className={styles.resultText}>{result.title}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import styles from './SearchModal.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/baseUrl';
import { Title } from '../types/TitleListInterface';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSearchQuery('');
      onClose();
    }
  };

  const handleTitleClick = () => {
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: '160px', width: 'calc(100% - 20px)' }}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {searchQuery && searchResults.map((result: Title) => (
              <Link
                to={`/comics/${result.titleSlug}`}
                key={result.titleSlug}
                className={styles.resultItem}
                onClick={handleTitleClick}
              >
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

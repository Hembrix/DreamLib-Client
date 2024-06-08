// src/components/SearchModal.tsx
import React, { useState } from 'react';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult'
import styles from './SearchModal.module.css';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
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
            {searchResults.map(result => (
              <Link to={`/comics/${result.titleSlug}`} key={result.titleSlug} className={styles.resultItem}>
                <img src={result.imagetitle} alt={result.TitleName} />
                <div className={styles.resultText}>{result.TitleName}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

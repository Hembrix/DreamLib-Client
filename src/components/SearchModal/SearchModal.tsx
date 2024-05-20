import React, { useState } from 'react';
import styles from './SearchModal.module.css';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const searchResults = [
    { id: 1, title: 'Хакер', image: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { id: 2, title: 'Руководство по тому, как из принца вырастить идеального мужа!', image: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { id: 3, title: 'Создатель', image: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { id: 4, title: 'Создатель зомби', image: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { id: 5, title: 'Создатель мира', image: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' }
  ];

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
        <div>
          {searchResults.filter(result => result.title.toLowerCase().includes(searchQuery.toLowerCase())).map(result => (
            <Link to='comics' key={result.id} className={styles.resultItem}>
              <img src={result.image} alt={result.title} />
              <div className={styles.resultText}>{result.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

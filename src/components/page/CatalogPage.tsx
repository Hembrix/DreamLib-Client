import React, { useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/CatalogPage.module.css';
import { Card } from '../card/Card'; // Импортируем компонент Card

interface CatalogItem {
  title: string;
  rating: number;
  episodes: number;
  genre: string;
  type: string;
  projectStatus: string;
  translationStatus: string;
  imageUrl: string; // Добавляем новое поле imageUrl
}

export const CatalogPage: React.FC = () => {
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [projectStatusFilter, setProjectStatusFilter] = useState<string | null>(null);
  const [translationStatusFilter, setTranslationStatusFilter] = useState<string | null>(null);

  const items: CatalogItem[] = [
    { title: 'Аниме 1', rating: 4.5, episodes: 12, genre: 'Фэнтези', type: 'Манга', projectStatus: 'Завершен', translationStatus: 'В процессе', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 2', rating: 4.7, episodes: 24, genre: 'Экшн', type: 'Аниме', projectStatus: 'В процессе', translationStatus: 'Завершен', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 1', rating: 4.5, episodes: 12, genre: 'Фэнтези', type: 'Манга', projectStatus: 'Завершен', translationStatus: 'В процессе', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 2', rating: 4.7, episodes: 24, genre: 'Экшн', type: 'Аниме', projectStatus: 'В процессе', translationStatus: 'Завершен', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 1', rating: 4.5, episodes: 12, genre: 'Фэнтези', type: 'Манга', projectStatus: 'Завершен', translationStatus: 'В процессе', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 2', rating: 4.7, episodes: 24, genre: 'Экшн', type: 'Аниме', projectStatus: 'В процессе', translationStatus: 'Завершен', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 1', rating: 4.5, episodes: 12, genre: 'Фэнтези', type: 'Манга', projectStatus: 'Завершен', translationStatus: 'В процессе', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' },
    { title: 'Аниме 2', rating: 4.7, episodes: 24, genre: 'Экшн', type: 'Аниме', projectStatus: 'В процессе', translationStatus: 'Завершен', imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg' }
  ];

  const filteredItems = items.filter(item =>
    (genreFilter === null || item.genre === genreFilter) &&
    (typeFilter === null || item.type === typeFilter) &&
    (projectStatusFilter === null || item.projectStatus === projectStatusFilter) &&
    (translationStatusFilter === null || item.translationStatus === translationStatusFilter)
  );

  const genreOptions = [
    { value: null, label: 'Не выбрано' },
    { value: 'Фэнтези', label: 'Фэнтези' },
    { value: 'Экшн', label: 'Экшн' },
    // Добавьте больше опций здесь...
  ];

  const typeOptions = [
    { value: null, label: 'Не выбрано' },
    { value: 'Манга', label: 'Манга' },
    { value: 'Аниме', label: 'Аниме' },
    // Добавьте больше опций здесь...
  ];

  const projectStatusOptions = [
    { value: null, label: 'Не выбрано' },
    { value: 'Завершен', label: 'Завершен' },
    { value: 'В процессе', label: 'В процессе' },
    // Добавьте больше опций здесь...
  ];

  const translationStatusOptions = [
    { value: null, label: 'Не выбрано' },
    { value: 'Завершен', label: 'Завершен' },
    { value: 'В процессе', label: 'В процессе' },
    // Добавьте больше опций здесь...
  ];

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.filters}>
        <Select
          className={styles.filter}
          options={genreOptions}
          isSearchable
          placeholder="Выберите жанр..."
          defaultValue={genreOptions[0]} // Устанавливаем "Не выбрано" по умолчанию
          onChange={selectedOption => setGenreFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={typeOptions}
          isSearchable
          placeholder="Выберите тип..."
          defaultValue={typeOptions[0]} // Устанавливаем "Не выбрано" по умолчанию
          onChange={selectedOption => setTypeFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={projectStatusOptions}
          isSearchable
          placeholder="Выберите статус проекта..."
          defaultValue={projectStatusOptions[0]} // Устанавливаем "Не выбрано" по умолчанию
          onChange={selectedOption => setProjectStatusFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={translationStatusOptions}
          isSearchable
          placeholder="Выберите статус перевода..."
          defaultValue={translationStatusOptions[0]} // Устанавливаем "Не выбрано" по умолчанию
          onChange={selectedOption => setTranslationStatusFilter(selectedOption ? selectedOption.value : null)}
        />
      </div>
      <div className={styles.catalog}>
        {filteredItems.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            rating={item.rating}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};


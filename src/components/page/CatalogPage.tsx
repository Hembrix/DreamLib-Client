import React, { useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/CatalogPage.module.css';
import { Card } from '../card/Card';
import { useGetCatalogQuery } from '../../store/dreamLibInjects/GetCatalogQuery';
import { FilterParams } from '../types/FilterTitles';
import { Title } from '../types/TitleListInterfaceTypes';

const genreOptions = [
  { value: null, label: 'Не выбрано' },
  { value: 'Фэнтези', label: 'Фэнтези' },
  { value: 'Насилие', label: 'Насилие' },
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

export const CatalogPage: React.FC = () => {
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [projectStatusFilter, setProjectStatusFilter] = useState<string | null>(null);
  const [translationStatusFilter, setTranslationStatusFilter] = useState<string | null>(null);
  const [minRatingFilter, setMinRatingFilter] = useState<string | null>(null);
  const [maxRatingFilter, setMaxRatingFilter] = useState<string | null>(null);
  const [minYearFilter, setMinYearFilter] = useState<string | null>(null);
  const [maxYearFilter, setMaxYearFilter] = useState<string | null>(null);
  const [minChaptersFilter, setMinChaptersFilter] = useState<string | null>(null);
  const [maxChaptersFilter, setMaxChaptersFilter] = useState<string | null>(null);

  const filterParams: FilterParams = {
    title_types: typeFilter ? [typeFilter] : undefined,
    genres: genreFilter ? [genreFilter] : undefined,
    status: projectStatusFilter || undefined,
    translation_status: translationStatusFilter || undefined,
    min_rating: minRatingFilter ? parseFloat(minRatingFilter) : undefined,
    max_rating: maxRatingFilter ? parseFloat(maxRatingFilter) : undefined,
    min_year: minYearFilter ? parseInt(minYearFilter) : undefined,
    max_year: maxYearFilter ? parseInt(maxYearFilter) : undefined,
    min_chapters: minChaptersFilter ? parseInt(minChaptersFilter) : undefined,
    max_chapters: maxChaptersFilter ? parseInt(maxChaptersFilter) : undefined,
  };

  const { data: catalogData, error, isLoading } = useGetCatalogQuery(filterParams);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading catalog</div>;

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.filters}>
        <Select
          className={styles.filter}
          options={genreOptions}
          isSearchable
          placeholder="Выберите жанр..."
          defaultValue={genreOptions[0]}
          onChange={selectedOption => setGenreFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={typeOptions}
          isSearchable
          placeholder="Выберите тип..."
          defaultValue={typeOptions[0]}
          onChange={selectedOption => setTypeFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={projectStatusOptions}
          isSearchable
          placeholder="Выберите статус проекта..."
          defaultValue={projectStatusOptions[0]}
          onChange={selectedOption => setProjectStatusFilter(selectedOption ? selectedOption.value : null)}
        />
        <Select
          className={styles.filter}
          options={translationStatusOptions}
          isSearchable
          placeholder="Выберите статус перевода..."
          defaultValue={translationStatusOptions[0]}
          onChange={selectedOption => setTranslationStatusFilter(selectedOption ? selectedOption.value : null)}
        />
        <input
          className={styles.filter}
          type="number"
          step="0.1"
          placeholder="Минимальный рейтинг"
          value={minRatingFilter ?? ''}
          onChange={e => setMinRatingFilter(e.target.value)}
        />
        <input
          className={styles.filter}
          type="number"
          step="0.1"
          placeholder="Максимальный рейтинг"
          value={maxRatingFilter ?? ''}
          onChange={e => setMaxRatingFilter(e.target.value)}
        />
        <input
          className={styles.filter}
          type="number"
          step="1"
          placeholder="Минимальный год"
          value={minYearFilter ?? ''}
          onChange={e => setMinYearFilter(e.target.value)}
        />
        <input
          className={styles.filter}
          type="number"
          step="1"
          placeholder="Максимальный год"
          value={maxYearFilter ?? ''}
          onChange={e => setMaxYearFilter(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          step="1"
          placeholder="Минимальное количество глав"
          value={minChaptersFilter ?? ''}
          onChange={e => setMinChaptersFilter(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          step="1"
          placeholder="Максимальное количество глав"
          value={maxChaptersFilter ?? ''}
          onChange={e => setMaxChaptersFilter(e.target.value)}
        />
      </div>
      <div className={styles.catalog}>
        {catalogData?.titles.map((item: Title) => (
          <Card 
            key={item.titleSlug}
            title={item.title}
            type_of_work={item.type_of_work}
            average_rating={item.average_rating}
            imagetitle={item.imagetitle}
            titleSlug={item.titleSlug} 
            TitleName={item.TitleName}          
          />
        ))}
      </div>
    </div>
  );
}

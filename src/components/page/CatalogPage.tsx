import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import styles from '../../styles/CatalogPage.module.css';
import { Card } from '../card/Card';
import { useGetCatalogQuery } from '../../store/dreamLibInjects/GetCatalogQuery';
import { useGetFiltersQuery } from '../../store/dreamLibInjects/GetFilter';
import { FilterParams } from '../types/FilterTitles';
import { Title } from '../types/TitleListInterfaceTypes';

export const CatalogPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [projectStatusFilter, setProjectStatusFilter] = useState<string[]>([]);
  const [translationStatusFilter, setTranslationStatusFilter] = useState<string[]>([]);
  const [minRatingFilter, setMinRatingFilter] = useState<string | null>(null);
  const [maxRatingFilter, setMaxRatingFilter] = useState<string | null>(null);
  const [minYearFilter, setMinYearFilter] = useState<string | null>(null);
  const [maxYearFilter, setMaxYearFilter] = useState<string | null>(null);
  const [minChaptersFilter, setMinChaptersFilter] = useState<string | null>(null);
  const [maxChaptersFilter, setMaxChaptersFilter] = useState<string | null>(null);

  const filterParams: FilterParams = {
    title_types: typeFilter.length ? typeFilter : undefined,
    genres: genreFilter.length ? genreFilter : undefined,
    status: projectStatusFilter.length ? projectStatusFilter : undefined,
    translation_status: translationStatusFilter.length ? translationStatusFilter : undefined,
    min_rating: minRatingFilter ? parseFloat(minRatingFilter) : undefined,
    max_rating: maxRatingFilter ? parseFloat(maxRatingFilter) : undefined,
    min_year: minYearFilter ? parseInt(minYearFilter) : undefined,
    max_year: maxYearFilter ? parseInt(maxYearFilter) : undefined,
    min_chapters: minChaptersFilter ? parseInt(minChaptersFilter) : undefined,
    max_chapters: maxChaptersFilter ? parseInt(maxChaptersFilter) : undefined,
  };

  const { data: catalogData, error: catalogError, isLoading: catalogLoading } = useGetCatalogQuery(filterParams);
  const { data: filtersData, error: filtersError, isLoading: filtersLoading } = useGetFiltersQuery();

  const handleMultiSelectChange = (
    setState: React.Dispatch<React.SetStateAction<string[]>>, 
    selectedOptions: MultiValue<{ value: string; label: string; }>
  ) => {
    setState(selectedOptions.map(option => option.value));
  };

  if (catalogLoading || filtersLoading) return <div className={styles.loading}>Loading...</div>;
  if (catalogError || filtersError) return <div className={styles.error}>Error loading data</div>;

  const typeOptions = filtersData?.types_of_work.map(type => ({ value: type, label: type })) ?? [];
  const genreOptions = filtersData?.genres.map(genre => ({ value: genre, label: genre })) ?? [];
  const projectStatusOptions = filtersData?.status.map(status => ({ value: status, label: status })) ?? [];
  const translationStatusOptions = filtersData?.translation_status.map(status => ({ value: status, label: status })) ?? [];

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.filters}>
        <p>Тип произведения</p>
        <Select
          className={styles.filter}
          options={typeOptions}
          isMulti
          isSearchable
          placeholder="Выберите тип..."
          onChange={(selectedOptions) => handleMultiSelectChange(setTypeFilter, selectedOptions)}
        />
        <p>Жанр</p>
        <Select
          className={styles.filter}
          options={genreOptions}
          isMulti
          isSearchable
          placeholder="Выберите жанр..."
          onChange={(selectedOptions) => handleMultiSelectChange(setGenreFilter, selectedOptions)}
        />
        <p>Статус проекта</p>
        <Select
          className={styles.filter}
          options={projectStatusOptions}
          isMulti
          isSearchable
          placeholder="Выберите статус проекта..."
          onChange={(selectedOptions) => handleMultiSelectChange(setProjectStatusFilter, selectedOptions)}
        />
        <p>Статус перевода</p>
        <Select
          className={styles.filter}
          options={translationStatusOptions}
          isMulti
          isSearchable
          placeholder="Выберите статус перевода..."
          onChange={(selectedOptions) => handleMultiSelectChange(setTranslationStatusFilter, selectedOptions)}
        />
        <p>Рейтинг произведения</p>
        <input
          className={styles.inputField}
          type="number"
          step="0.1"
          placeholder="Минимальный рейтинг"
          value={minRatingFilter ?? ''}
          onChange={e => setMinRatingFilter(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          step="0.1"
          placeholder="Максимальный рейтинг"
          value={maxRatingFilter ?? ''}
          onChange={e => setMaxRatingFilter(e.target.value)}
        />
        <p>Год произведения</p>
        <input
          className={styles.inputField}
          type="number"
          step="1"
          placeholder="Минимальный год"
          value={minYearFilter ?? ''}
          onChange={e => setMinYearFilter(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          step="1"
          placeholder="Максимальный год"
          value={maxYearFilter ?? ''}
          onChange={e => setMaxYearFilter(e.target.value)}
        />
        <p>Количество глав</p>
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
          />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import styles from './addChapter.module.css';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import { useGetChapterListQuery } from '../../store/dreamLibInjects/GetChapterList';
import { BASE_URL } from '../utils/baseUrl';

export const EditChapter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<{ value: string; label: string } | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{ value: string; label: string } | null>(null);
  const [pages, setPages] = useState<string[]>([]);

  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  const { data: chapterListData, isLoading: isLoadingChapters } = useGetChapterListQuery(selectedTitle?.value || '', {
    enabled: !!selectedTitle?.value,
  });

  // Мок данных главы
  useEffect(() => {
    const mockChapterData = {
      pages: [
        { image_data: 'path/to/image1.jpg' },
        { image_data: 'path/to/image2.jpg' },
      ],
    };

    if (selectedChapter) {
      const chapterPages: string[] = mockChapterData.pages.map((page) => page.image_data);
      setPages(chapterPages);
    } else {
      setPages([]);
    }
  }, [selectedChapter]);

  const handleTitleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    setSelectedTitle(selectedOption);
    setSelectedChapter(null);
  };

  const handleChapterChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    setSelectedChapter(selectedOption);
  };

  const handleDeleteChapter = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить главу?')) {
      return;
    }

    try {
      console.log('Глава успешно удалена!');
      setPages([]);
      setSelectedChapter(null);
    } catch (error) {
      console.error('Ошибка при удалении главы:', error);
    }
  };

  return (
    <div className={styles.formContainerLight}>
      <h2 className={styles.formTitle}>Удалить Главу</h2>
      <Select
        options={searchResults.map((result) => ({ value: result.titleSlug, label: result.title }))}
        onInputChange={setSearchQuery}
        onChange={handleTitleChange}
        isLoading={isSearchLoading}
        placeholder="Поиск произведения..."
        className={styles.select}
        value={selectedTitle}
      />
      <Select
        options={chapterListData?.chapters.map((chapter) => ({
          value: chapter.chapter_id.toString(),
          label: chapter.chapter_name,
        })) || []}
        onChange={handleChapterChange}
        placeholder="Выберите главу..."
        className={styles.select}
        value={selectedChapter}
        isLoading={isLoadingChapters}
        isDisabled={!selectedTitle || !searchResults.length}
      />

      <div className={styles.buttonContainer}>
        <button type="button" onClick={handleDeleteChapter} className={styles.deleteButton}>
          Удалить главу
        </button>
      </div>
      <div className={styles.pageContainer}>
        {pages.map((page, index) => (
          <img key={index} src={`${BASE_URL}${page}`} alt={`Страница ${index + 1}`} className={styles.pagePreview} />
        ))}
      </div>
    </div>
  );
};

export default EditChapter;

import React, { useState, useRef } from 'react';
import Select, { SingleValue } from 'react-select';
import styles from './AddChapter.module.css';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import { useAddChapterMutation } from '../../store/dreamLibInjects/postChapter';

export const AddChapter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  const [selectedTitle, setSelectedTitle] = useState<{ value: string; label: string } | null>(null);
  const [chapterTitle, setChapterTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewMode, setViewMode] = useState<'scroll' | 'flip'>('scroll');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [addChapter] = useAddChapterMutation();

  const handleTitleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    setSelectedTitle(selectedOption);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'scroll' ? 'flip' : 'scroll'));
  };

  const toggleEditingMode = () => {
    setIsEditing(!isEditing);
  };

  const movePageUp = (index: number) => {
    if (index > 0) {
      const newImages = [...images];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      setImages(newImages);
    }
  };

  const movePageDown = (index: number) => {
    if (index < images.length - 1) {
      const newImages = [...images];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      setImages(newImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTitle) {
      alert('Пожалуйста, выберите произведение.');
      return;
    }

    const formData = new FormData();
    formData.append('titleSlug', selectedTitle.value);
    formData.append('chapterTitle', chapterTitle);
    images.forEach((image, index) => {
      formData.append(`chapterContent[${index}]`, image);
    });

    console.log('Отправка данных:', {
      titleSlug: selectedTitle.value,
      chapterTitle,
      chapterContent: images,
    });

    try {
      await addChapter(formData);
      alert('Глава успешно добавлена!');
      setChapterTitle('');
      setImages([]);
      setSelectedTitle(null);
      setSearchQuery('');
    } catch (error) {
      console.error('Ошибка при добавлении главы:', error);
    }
  };

  return (
    <div className={styles.formContainerLight}>
      <h2 className={styles.formTitle}>Добавить главу</h2>
      <Select
        options={searchResults.map(result => ({ value: result.titleSlug, label: result.title }))}
        onInputChange={setSearchQuery}
        onChange={handleTitleChange}
        isLoading={isSearchLoading}
        placeholder="Поиск произведения..."
        className={styles.select}
        value={selectedTitle}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.infoItem}>
          <label className={styles.label}>Название главы:</label>
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>Содержание главы:</label>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={toggleViewMode} className={styles.viewToggle}>
              {viewMode === 'scroll' ? 'Перелистывание' : 'Лента'}
            </button>
            <button type="button" onClick={toggleEditingMode} className={styles.viewToggle}>
              {isEditing ? 'Сохранить порядок' : 'Редактировать порядок'}
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
          />
          {images.length > 0 && (
            <div className={styles.viewModeToggleContainer}>
              {viewMode === 'scroll' && images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Страница ${index + 1}`}
                    className={styles.imagePreview}
                  />
                  {isEditing && (
                    <div className={styles.editButtons}>
                      <button type="button" onClick={() => movePageUp(index)}>&uarr;</button>
                      <button type="button" onClick={() => movePageDown(index)}>&darr;</button>
                    </div>
                  )}
                </div>
              ))}
              {viewMode === 'flip' && images.length > 0 && (
                <div className={styles.flipView}>
                  <button type="button" onClick={handlePreviousPage} className={styles.navButton}>&larr;</button>
                  <img src={URL.createObjectURL(images[currentPage])} alt={`Страница ${currentPage + 1}`} className={styles.flipImage} />
                  <button type="button" onClick={handleNextPage} className={styles.navButton}>&rarr;</button>
                  <div className={styles.pageCounter}>
                    {currentPage + 1} / {images.length}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleAddImageClick} className={styles.addButton}>
            Добавить страницы
          </button>
          <button type="submit" className={styles.submitButton}>Добавить главу</button>
        </div>
      </form>
    </div>
  );
};

export default AddChapter;

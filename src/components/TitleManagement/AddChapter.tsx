import React, { useState, useRef } from 'react';
import Select, {SingleValue } from 'react-select';
import styles from './AddChapter.module.css';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import { useAddChapterMutation } from '../../store/dreamLibInjects/postChapter';

interface ImageFile extends File {
  preview: string;
}

export const AddChapter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  const [selectedTitle, setSelectedTitle] = useState<{ value: string; label: string } | null>(null);
  const [chapterTitle, setChapterTitle] = useState<string>('');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewMode, setViewMode] = useState<'scroll' | 'flip'>('scroll');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [addChapter] = useAddChapterMutation();

  const handleTitleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setSelectedTitle(selectedOption);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const imageFiles = Array.from(files).map(file => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setImages(prevImages => [...prevImages, ...imageFiles]);
  };

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
      setCurrentPage(index - 1);
    }
  };

  const movePageDown = (index: number) => {
    if (index < images.length - 1) {
      const newImages = [...images];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      setImages(newImages);
      setCurrentPage(index + 1);
    }
  };

  const handleImageClick = (clickedSide: 'left' | 'right') => {
    if (viewMode === 'flip') {
      if (clickedSide === 'left' && currentPage > 0) {
        setCurrentPage(prevPage => prevPage - 1);
      } else if (clickedSide === 'right' && currentPage < images.length - 1) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTitle) {
      alert('Пожалуйста, выберите название.');
      return;
    }

    if (!images.length) {
      alert('Пожалуйста, добавьте изображения.');
      return;
    }

    const formData = new FormData();
    formData.append('titleSlug', selectedTitle.value);
    formData.append('chapterTitle', chapterTitle.trim());
    images.forEach((image, index) => {
      formData.append(`chapterContent[${index}]`, image);
      console.log('Отправленные данные:', {
        title_slug: selectedTitle.value,
        chapter_name: chapterTitle,
        page_number: index + 1,
        image_data: image,
      });
    });

    try {
      await addChapter({ formData, titleSlug: selectedTitle.value });
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
        placeholder="Поиск названия..."
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
          <label className={styles.label}>Контент главы:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
          />
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleAddImageClick} className={styles.addButton}>
              Добавить изображения
            </button>
            <button type="button" onClick={toggleViewMode} className={styles.viewToggle}>
              {viewMode === 'scroll' ? 'Листать' : 'Перелистывать'}
            </button>
            <button type="button" onClick={toggleEditingMode} className={styles.viewToggle}>
              {isEditing ? 'Сохранить порядок' : 'Редактировать порядок'}
            </button>
          </div>
          {images.length > 0 && (
            <div className={styles.viewModeToggleContainer}>
              {viewMode === 'scroll' && images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <img
                    src={image.preview}
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
                  <img
                    src={images[currentPage].preview}
                    alt={`Страница ${currentPage + 1}`}
                    className={styles.flipImage}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickPositionX = e.clientX - rect.left;
                      const halfWidth = rect.width / 2;
                      const clickedSide = clickPositionX < halfWidth ? 'left' : 'right';
                      handleImageClick(clickedSide);
                    }}
                  />
                  <div className={styles.pageCounter}>
                    {currentPage + 1} / {images.length}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>Добавить главу</button>
        </div>
      </form>
    </div>
  );
};

export default AddChapter;

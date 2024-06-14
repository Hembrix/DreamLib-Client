import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Select, { MultiValue, SingleValue } from 'react-select';
import styles from './AddTitle.module.css';
import { useGetTitleQuery } from '../../store/dreamLibInjects/GetComicsInfo';
import { useEditTitleMutation, useDeleteTitleMutation } from '../../store/dreamLibInjects/editTitle';
import { useGetFiltersQuery } from '../../store/dreamLibInjects/GetFilter';
import { useSearchTitlesQuery } from '../../store/dreamLibInjects/GetSearchResult';
import { BASE_URL } from '../utils/baseUrl';

export const EditTitle: React.FC = () => {
  const params = useParams<{ titleSlug: string }>();
  const [titleSlug, setTitleSlug] = useState<string | null>(params.titleSlug ?? null);
  const { data: filtersData } = useGetFiltersQuery();
  const { data: titleData, refetch, isUninitialized } = useGetTitleQuery(titleSlug!, {
    skip: !titleSlug,
  });
  const [editTitle] = useEditTitleMutation();
  const [deleteTitle] = useDeleteTitleMutation();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchTitlesQuery(searchQuery, {
    skip: !searchQuery,
  });

  const [titleName, setTitleName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<{ value: string; label: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(null);
  const [selectedType, setSelectedType] = useState<{ value: string; label: string } | null>(null);
  const [translationStatus, setTranslationStatus] = useState<{ value: string; label: string } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleData) {
      setTitleName(titleData.title);
      setAuthor(titleData.author);
      setDescription(titleData.description);
      setSelectedGenres(titleData.genres.map((genre: string) => ({ value: genre, label: genre })));
      setSelectedStatus({ value: titleData.titleStatus, label: titleData.titleStatus });
      setSelectedType({ value: titleData.type_of_work, label: titleData.type_of_work });
      setTranslationStatus({ value: titleData.translationStatus, label: titleData.translationStatus });
      setImageUrl(titleData.imagetitle);
      console.log('Данные произведения:', titleData);
    }
  }, [titleData]);

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
      console.log('Изображение:', imageUrl);
    }
  }, [image]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const clearFields = () => {
    setSearchQuery('');
    setTitleName('');
    setAuthor('');
    setDescription('');
    setSelectedGenres([]);
    setSelectedStatus(null);
    setSelectedType(null);
    setTranslationStatus(null);
    setImage(null);
    setImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Отправляемые данные:');
    console.log('Название:', titleName);
    console.log('Автор:', author);
    console.log('Описание:', description);
    console.log('Жанры:', selectedGenres);
    console.log('Статус:', selectedStatus);
    console.log('Тип:', selectedType);
    console.log('Статус перевода:', translationStatus);
    console.log('Изображение:', image);

    const formData = new FormData();
    formData.append('title_name', titleName);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('genre_names', JSON.stringify(selectedGenres.map(genre => genre.value)));
    formData.append('title_status_name', selectedStatus!.value);
    formData.append('type_name', selectedType!.value);
    formData.append('translation_status_name', translationStatus!.value);

    if (image) {
      formData.append('image_title', image);
    }

    try {
      await editTitle({ formData, titleSlug });

    } catch (error) {
      console.error('Ошибка при обновлении произведения:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить произведение?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteTitle(titleSlug!);
      console.log('Произведение успешно удалено!');
      clearFields(); // Очистить поля после успешного удаления
    } catch (error) {
      console.error('Ошибка при удалении произведения:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTitleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    const newTitleSlug = selectedOption!.value;
    setTitleSlug(newTitleSlug);
  };

  useEffect(() => {
    if (titleSlug && !isUninitialized) {
      refetch();
    }
  }, [titleSlug, isUninitialized, refetch]);

  return (
    <div className={styles.formContainerLight}>
      <h2 className={styles.formTitle}>Редактировать произведение</h2>
      <Select
        options={searchResults.map(result => ({ value: result.titleSlug, label: result.title }))}
        onInputChange={setSearchQuery}
        onChange={handleTitleChange}
        isLoading={isSearchLoading}
        placeholder="Поиск..."
        className={styles.select}
      />
      <div className={styles.flexContainer}>
        <div className={styles.imageContainer} onClick={handleImageClick}>
          {imageUrl && (
            <img src={`${BASE_URL}${imageUrl}`} alt="Выбранное изображение" className={styles.imagePreview} />
          )}
          {!imageUrl && (
            <div className={styles.placeholderText}>Нажмите для загрузки изображения</div>
          )}
          <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={styles.fileInput}
        />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <label className={styles.label}>Название:</label>
            <input
              type="text"
              value={titleName}
              onChange={(e) => setTitleName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.infoItem}>
            <label className={styles.label}>Автор:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.infoItem}>
          <label className={styles.label}>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>Жанры:</label>
          <Select
            options={filtersData?.genres.map(genre => ({ value: genre, label: genre })) || []}
            isMulti
            value={selectedGenres}
            onChange={(newValue: MultiValue<{ value: string; label: string }>) =>
              setSelectedGenres(newValue as { value: string; label: string }[])
            }
            className={styles.select}
          />
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.statusContainer}>
            <label className={styles.label}>Статус:</label>
            <Select
              options={filtersData?.status.map(status => ({ value: status, label: status })) || []}
              value={selectedStatus}
              onChange={(newValue: { value: string; label: string } | null) =>
                setSelectedStatus(newValue)
              }
              className={styles.select}
            />
          </div>
          <div className={styles.statusContainer}>
            <label className={styles.label}>Тип:</label>
            <Select
              options={filtersData?.types_of_work.map(type => ({ value: type, label: type })) || []}
              value={selectedType}
              onChange={(newValue: { value: string; label: string } | null) =>
                setSelectedType(newValue)
              }
              className={styles.select}
            />
          </div>
          <div className={styles.statusContainer}>
            <label className={styles.label}>Статус перевода:</label>
            <Select
              options={filtersData?.translation_status.map(status => ({ value: status, label: status })) || []}
              value={translationStatus}
              onChange={(newValue: { value: string; label: string } | null) =>
                setTranslationStatus(newValue)
              }
              className={styles.select}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>Сохранить</button>
          <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </form>
    </div>
  );
};



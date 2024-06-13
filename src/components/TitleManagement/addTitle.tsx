import React, { useState, useEffect, useRef } from 'react';
import { usePostTitleMutation } from '../../store/dreamLibInjects/postTitle';
import { useGetFiltersQuery } from '../../store/dreamLibInjects/GetFilter';
import Select, { MultiValue } from 'react-select';
import styles from './AddTitle.module.css';

export const AddTitle: React.FC = () => {
  const [titleName, setTitleName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [titleDate, setTitleDate] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<{ value: string; label: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(null);
  const [selectedType, setSelectedType] = useState<{ value: string; label: string } | null>(null);
  const [translationStatus, setTranslationStatus] = useState<{ value: string; label: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: filtersData, isLoading: filtersLoading } = useGetFiltersQuery();
  const [addTitle, { isLoading, isError }] = usePostTitleMutation();

  useEffect(() => {
    if (!filtersLoading && filtersData) {
      setSelectedGenres([]);
      setSelectedStatus(null);
      setSelectedType(null);
      setTranslationStatus(null);
    }
  }, [filtersLoading, filtersData]);

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleName || !author || !description || !image || !selectedGenres.length || !selectedStatus || !selectedType || !translationStatus || !titleDate) {
      console.error('Заполните обязательные поля');
      return;
    }

    const formData = new FormData();
    formData.append('title_name', titleName);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('title_date', titleDate);
    formData.append('image_title', image); // Добавляем изображение

    selectedGenres.forEach(genre => formData.append('genre_names', genre.value));
    formData.append('title_status_name', selectedStatus!.value);
    formData.append('type_name', selectedType!.value);
    formData.append('translation_status_name', translationStatus!.value);

    // Вывод отправляемых данных в консоль
    const sendData = {
      title_name: titleName,
      author: author,
      description: description,
      title_date: titleDate,
      genre_names: selectedGenres.map(genre => genre.value),
      title_status_name: selectedStatus!.value,
      type_name: selectedType!.value,
      translation_status_name: translationStatus!.value,
      image_title: image.name // Имя изображения для отображения в консоли
    };
    console.log('Отправляемые данные:', sendData);

    try {
      await addTitle(formData);
      setTitleName('');
      setAuthor('');
      setDescription('');
      setImage(null);
      setImageUrl(null);
      setTitleDate('');
      setSelectedGenres([]);
      setSelectedStatus(null);
      setSelectedType(null);
      setTranslationStatus(null);
    } catch (error) {
      console.error('Ошибка при добавлении произведения:', error);
    }
  };

  return (
    <div className={styles.formContainerLight}>
      <h2 className={styles.formTitle}>Добавить произведение</h2>
      <div className={styles.flexContainer}>
        <div className={styles.imageContainer} onClick={handleImageClick}>
          {imageUrl ? (
            <img src={imageUrl} alt="Выбранное изображение" className={styles.imagePreview} />
          ) : (
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
            <label className={styles.label}>Тип комикса:</label>
            <Select
              options={filtersData?.types_of_work.map((type) => ({ value: type, label: type })) || []}
              value={selectedType}
              onChange={(newValue: { value: string; label: string } | null) =>
                setSelectedType(newValue)
              }
              className={styles.select}
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
          <div className={styles.infoItem}>
            <label className={styles.label}>Дата (дд.мм.гггг):</label>
            <input
              type="text"
              value={titleDate}
              onChange={(e) => setTitleDate(e.target.value)}
              className={styles.input}
              placeholder="дд.мм.гггг"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Описание:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>Жанры:</label>
        <Select
          options={filtersData?.genres.map((genre) => ({ value: genre, label: genre })) || []}
          isMulti
          value={selectedGenres}
          onChange={(newValue: MultiValue<{ value: string; label: string }>) =>
            setSelectedGenres(newValue as { value: string; label: string }[])
          }
          className={styles.select}
        />
        <div className={styles.flexContainer}>
          <div className={styles.statusContainer}>
            <label className={styles.label}>Статус перевода:</label>
            <Select
              options={filtersData?.translation_status.map((status) => ({ value: status, label: status })) || []}
              value={translationStatus}
              onChange={(newValue: { value: string; label: string } | null) =>
                setTranslationStatus(newValue)
              }
              className={styles.select}
            />
          </div>
          <div className={styles.statusContainer}>
            <label className={styles.label}>Статус проекта:</label>
            <Select
              options={filtersData?.status.map((status) => ({ value: status, label: status })) || []}
              value={selectedStatus}
              onChange={(newValue: { value: string; label: string } | null) =>
                setSelectedStatus(newValue)
              }
              className={styles.select}
            />
          </div>
        </div>
        <button type="submit" disabled={isLoading} className={styles.submitButton}>Добавить</button>
        {isError && <div className={styles.error}>Ошибка при добавлении произведения</div>}
      </form>
    </div>
  );
};

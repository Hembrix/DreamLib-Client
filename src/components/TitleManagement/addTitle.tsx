import React, { useState } from 'react';
import { usePostTitleMutation } from '../../store/dreamLibInjects/postTitle';

export const AddTitle: React.FC = () => {
  const [titleName, setTitleName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [typeId, setTypeId] = useState('');
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [titleDate, setTitleDate] = useState('');

  const [addTitle, { isLoading, isError }] = usePostTitleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      { field: 'Название', value: titleName },
      { field: 'Автор', value: author },
      { field: 'Описание', value: description },
      { field: 'Тип ID', value: typeId },
      { field: 'Дата', value: titleDate },
    ];

    const emptyFields = requiredFields.filter(field => !field.value);

    if (!image) {
      console.error('Пожалуйста, выберите изображение');
      return;
    }

    if (emptyFields.length > 0) {
      console.error(`Заполните следующие поля: ${emptyFields.map(field => field.field).join(', ')}`);
      return;
    }

    const formData = new FormData();
    formData.append('title_name', titleName);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('type_id', typeId);
    formData.append('title_date', titleDate);
    formData.append('image', image as Blob);
    genreIds.forEach((id) => formData.append('genre_ids', id));

    // Выводим данные, которые собираются отправиться в консоль
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await addTitle(formData);
      // Очистить поля после успешного добавления
      setTitleName('');
      setAuthor('');
      setDescription('');
      setTypeId('');
      setGenreIds([]);
      setImage(null);
      setTitleDate('');
    } catch (error) {
      console.error('Ошибка при добавлении произведения:', error);
    }
  };

  return (
    <div>
      <h2>Добавить произведение</h2>
      <form onSubmit={handleSubmit}>
        {/* Остальные поля формы */}
        <label>
          Название:
          <input type="text" value={titleName} onChange={(e) => setTitleName(e.target.value)} />
        </label>
        <br />
        <label>
          Автор:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          Описание:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Тип ID:
          <input type="text" value={typeId} onChange={(e) => setTypeId(e.target.value)} />
        </label>
        <br />
        <label>
          Жанры (через запятую):
          <input type="text" value={genreIds.join(',')} onChange={(e) => setGenreIds(e.target.value.split(','))} />
        </label>
        <br />
        <label>
          Изображение:
          <input type="file" accept="image/jpeg,image/png,image/webp,image/jpg" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
        <br />
        <label>
          Дата:
          <input type="text" value={titleDate} onChange={(e) => setTitleDate(e.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>Добавить</button>
        {isError && <div>Ошибка при добавлении произведения</div>}
      </form>
    </div>
  );
};


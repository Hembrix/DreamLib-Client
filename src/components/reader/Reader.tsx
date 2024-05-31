import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Reader.css';
import { useGetChapterQuery } from '../../store/dreamLibInjects/GetChapter';
import { Chapter } from '../types/ChapterInterface';

const Reader: React.FC = () => {
  const { chapterId, titleSlug } = useParams<{ chapterId: string; titleSlug: string }>();
  const totalChapters: number = 5;//ИСПРАВИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИИТЬ
  const [chapter_number, setChapter] = useState<number>(chapterId ? parseInt(chapterId, 10) : 1);
  const [pages, setPages] = useState<string[]>([]);

  const { data: chapterData, error, isLoading } = useGetChapterQuery({ titleSlug, chapterNumber: chapter_number.toString() });

  useEffect(() => {
    if (chapterData) {
      const chapterPages: string[] = chapterData.pages.map((page: Chapter) => page.image_data);
      setPages(chapterPages);
    }
  }, [chapterData]);

  const handlePreviousChapter = () => {
    if (chapter_number > 1) setChapter(chapter_number - 1);
  };

  const handleNextChapter = () => {
    if (chapter_number < totalChapters) setChapter(chapter_number + 1);
  };

  return (
    <div className="reader">
      <div className="reader-header">
        <button onClick={handlePreviousChapter} disabled={chapter_number === 1}>
          Предыдущая глава
        </button>
        <span>Глава {chapter_number}</span>
        <button onClick={handleNextChapter} disabled={chapter_number === totalChapters}>
          Следующая глава
        </button>
      </div>
      <div className="reader-content">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching chapter_number</div>}
        {!isLoading && !error && chapterData && pages.map((page: string, index: number) => (
          <img key={index} src={page} alt={`Глава ${chapter_number}, Страница ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Reader;

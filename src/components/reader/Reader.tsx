import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Reader.css';

const Reader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const totalChapters: number = 5;
  const pagesPerChapter: number = 11;
  const [chapter, setChapter] = useState<number>(chapterId ? parseInt(chapterId, 10) : 1);
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (chapterId) {
      const chapterPages: string[] = [];
      for (let i = 1; i <= pagesPerChapter; i++) {
        chapterPages.push(`https://via.placeholder.com/600x800?text=Chapter${chapter}_Page${i}`);
      }
      setPages(chapterPages);
    }
  }, [chapterId, chapter, pagesPerChapter]);
  

  const handlePreviousChapter = () => {
    if (chapter > 1) setChapter(chapter - 1);
  };

  const handleNextChapter = () => {
    if (chapter < totalChapters) setChapter(chapter + 1);
  };

  return (
    <div className="reader">
      <div className="reader-header">
        <button onClick={handlePreviousChapter} disabled={chapter === 1}>
          Предыдущая глава
        </button>
        <span>Глава {chapter}</span>
        <button onClick={handleNextChapter} disabled={chapter === totalChapters}>
          Следующая глава
        </button>
      </div>
      <div className="reader-content">
        {pages.map((page, index) => (
          <img key={index} src={page} alt={`Глава ${chapter}, Страница ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Reader;

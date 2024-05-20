import React, { useState } from 'react';
import './Reader.css';

const Reader: React.FC = () => {
  const [chapter, setChapter] = useState<number>(1);
  const totalChapters: number = 5;
  const pagesPerChapter: number = 11;

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
        <span>Глава {chapter} / {totalChapters}</span>
        <button onClick={handleNextChapter} disabled={chapter === totalChapters}>
          Следующая глава
        </button>
      </div>
      <div className="reader-content">
        {Array.from({ length: pagesPerChapter }, (_, index) => (
          <img
            key={index}
            src={`path/to/your/images/chapter${chapter}/page${index + 1}.jpg`}
            alt={`Глава ${chapter}, Страница ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Reader;

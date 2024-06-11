import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Reader.css';
import { useGetChapterQuery } from '../../store/dreamLibInjects/GetChapter';
import { Chapter } from '../types/ChapterInterface';

export const Reader: React.FC = () => {
  const { chapterId, titleSlug } = useParams<{ chapterId: string; titleSlug: string }>();
  const [chapter_number, setChapter] = useState<number>(chapterId ? parseInt(chapterId, 10) : 1);
  const [pages, setPages] = useState<string[]>([]);

  const { data: chapterData, error, isLoading } = useGetChapterQuery({ titleSlug: titleSlug ?? "", chapterNumber: chapter_number });

  useEffect(() => {
    if (chapterData) {
      const chapterPages: string[] = chapterData.pages.map((page: Chapter) => page.image_data);
      setPages(chapterPages);
    }
  }, [chapterData]);

  const totalChapters = chapterData?.chapter_count ?? 1;

  return (
    <div className="reader">
      <div className="reader-header">
        {chapter_number > 1 ? (
          <Link to={`/reader/${titleSlug}/${chapter_number - 1}`} onClick={() => setChapter(chapter_number - 1)}>
            Предыдущая глава
          </Link>
        ) : (
          <button disabled>Предыдущая глава</button>
        )}
        <span>Глава {chapter_number}</span>
        {chapter_number < totalChapters ? (
          <Link to={`/reader/${titleSlug}/${chapter_number + 1}`} onClick={() => setChapter(chapter_number + 1)}>
            Следующая глава
          </Link>
        ) : (
          <button disabled>Следующая глава</button>
        )}
      </div>
      <div className="reader-content">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching chapter</div>}
        {!isLoading && !error && chapterData && pages.map((page: string, index: number) => (
          <img key={index} src={page} alt={`Глава ${chapter_number}, Страница ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};



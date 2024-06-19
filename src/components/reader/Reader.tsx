import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Reader.css';
import { useGetChapterQuery } from '../../store/dreamLibInjects/GetChapter';
import { Chapter } from '../types/ChapterInterface';
import { BASE_URL } from '../utils/baseUrl';

export const Reader: React.FC = () => {
  const { chapter_number, titleSlug } = useParams<{ chapter_number?: string; titleSlug: string }>();
  const navigate = useNavigate();
  const chapterNumber = chapter_number ? parseInt(chapter_number, 10) : 1;
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scroll' | 'flip'>('scroll');

  const { data: chapterData, error, isLoading } = useGetChapterQuery({ titleSlug: titleSlug ?? "", chapterNumber: chapterNumber });

  useEffect(() => {
    if (chapterData) {
      const chapterPages: string[] = chapterData.pages.map((page: Chapter) => page.image_data);
      setPages(chapterPages);
      setCurrentPage(0); 
    }
  }, [chapterData, chapterNumber, titleSlug]);

  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = event;
    const middle = currentTarget.clientWidth / 2;

    if (clientX < middle) {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    } else {
      setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'scroll' ? 'flip' : 'scroll'));
  };

  const handleChapterChange = (newChapterNumber: number) => {
    setCurrentPage(0); // Reset current page to first page on chapter change
    navigate(`/comics/${titleSlug}/${newChapterNumber}`);
    window.location.reload(); // Обновление страницы
  };

  return (
    <div className="reader">
      <div className="reader-header">
        <Link to={`/comics/${titleSlug}`} className="nav-button">
        &larr; К тайтлу
        </Link>
        <button onClick={() => handleChapterChange(chapterNumber - 1)} className="nav-button" disabled={chapterNumber <= 1}>
          &larr;
        </button>
        <span>Глава {chapterNumber}</span>
        <button onClick={() => handleChapterChange(chapterNumber + 1)} className="nav-button" disabled={chapterNumber >= (chapterData?.chapter_count ?? 1)}>
          &rarr;
        </button>
        <button onClick={toggleViewMode} className="view-toggle">
          {viewMode === 'scroll' ? 'Постранично' : 'Лента'}
        </button>
      </div>
      <div className={`reader-content ${viewMode}`} onClick={viewMode === 'flip' ? handlePageClick : undefined}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching chapter</div>}
        {!isLoading && !error && chapterData && (
          <>
            {viewMode === 'scroll' && pages.map((page: string, index: number) => (
              <img key={index} src={`${BASE_URL}${page}`} alt={`Глава ${chapterNumber}, Страница ${index}`} />
            ))}
            {viewMode === 'flip' && pages.length > 0 && (
              <div className="flip-view">
                <img src={`${BASE_URL}${pages[currentPage]}`} alt={`Глава ${chapterNumber}, Страница ${currentPage}`} />
                <div className="page-counter">
                  {currentPage + 1} / {pages.length}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

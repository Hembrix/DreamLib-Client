import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../../styles/ComicsPage.module.css';
import { useGetTitleQuery } from '../../store/dreamLibInjects/GetComicsInfo';
import { useGetChapterListQuery } from '../../store/dreamLibInjects/GetChapterList';
import { useGetCommentsQuery } from '../../store/dreamLibInjects/GetCommentsQuery';
import { BASE_URL } from '../utils/baseUrl';
import { ChapterList } from '../types/ChapterListInterfaceTypes';
import { Comment } from '../types/CommentsListInterface';

export const ComicsPage: React.FC = () => {
  const { titleSlug } = useParams<{ titleSlug: string }>();
  const { data: comicsInfo, isLoading: isLoadingComics, isError: isErrorComics } = useGetTitleQuery(titleSlug);
  const { data: chapterList, isLoading: isLoadingChapters, isError: isErrorChapters } = useGetChapterListQuery(titleSlug);
  const { data: commentsInfo, isLoading: isLoadingComments, isError: isErrorComments } = useGetCommentsQuery(titleSlug);

  const [activeTab, setActiveTab] = useState('Описание');

  if (isLoadingComics) {
    return <div>Loading...</div>;
  }

  if (isErrorComics) {
    return <div>Error loading comic information.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.stickyContainer}>
        <img
          src={`${BASE_URL}${comicsInfo.imagetitle}`}
          alt={comicsInfo.title}
          className={styles.image}
        />
        <button className={styles.button}>Читать</button>
        <button className={`${styles.button} ${styles.bookmarkButton}`}>
          Добавить в закладки
        </button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{comicsInfo.title}</h1>
          <div className={styles.infoContainer}>
            <p className={styles.label}>Рейтинг</p>
            <p className={styles.rating}>★{comicsInfo.average_rating}</p>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.label}>Глав</p>
            <p className={styles.chapterCount}>{chapterList?.chapter_count} </p>
          </div>
      </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'Описание' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('Описание')}
          >
            Описание
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'Главы' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('Главы')}
          >
            Главы
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'Комментарии' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('Комментарии')}
          >
            Комментарии
          </button>
        </div>
        <div className={styles.content}>
          {activeTab === 'Описание' && (
            <div className={styles.description}>
              <p>{comicsInfo.description}</p>
              <div className={styles.tags}>
                {comicsInfo.genres.map((genre: string, index: number) => (
                  <span key={index} className={styles.tag}>{genre}</span>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'Главы' && (
            <div className={styles.chapters}>
              {isLoadingChapters && <div>Loading chapters...</div>}
              {isErrorChapters && <div>Error loading chapters.</div>}
              {chapterList?.chapters?.length ? (
                chapterList.chapters.map((chapter: ChapterList) => (
                  <Link key={chapter.chapter_number} className={styles.chapter} to={`/comics/${titleSlug}/${chapter.chapter_number}`}>
                    <div className={styles.chapterTitle}>
                      <span>{chapter.chapter_name}</span>
                    </div>
                    <div className={styles.chapterDate}>{chapter.upload_date}</div>
                  </Link>
                ))
              ) : (
                <div>No chapters available.</div>
              )}
            </div>
          )}
          {activeTab === 'Комментарии' && (
            <div className={styles.commentsList}>
              {isLoadingComments && <div>Loading comments...</div>}
              {isErrorComments && <div>Error loading comments.</div>}
              {commentsInfo ? (
                commentsInfo.comments.map((comment: Comment, index: number) => (
                  <div key={index} className={styles.comment}>
                    <strong>{comment.user}</strong>: {comment.comment} <em>({comment.date})</em>
                  </div>
                ))
              ) : (
                <div>No comments available.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

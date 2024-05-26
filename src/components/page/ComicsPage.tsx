import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/ComicsPage.module.css';
import { useGetTitleQuery } from '../../store/NAMEInjects/GetComicsInfo';
import { Link } from 'react-router-dom';

interface Chapter {
  id: number;
  title: string;
  date: string; // Добавлено поле для даты
}

export const ComicsPage: React.FC = () => {
  const { titleSlug } = useParams<{ titleSlug: string }>();
  const { data: comicsInfo, isLoading, isError } = useGetTitleQuery(titleSlug);
  const [activeTab, setActiveTab] = useState('Описание');
  const [chapters] = useState<Chapter[]>([]); // Пока что нет данных о главах


  if (isLoading) return <div>Loading...</div>;
  if (isError || !comicsInfo) return <div>Error...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.stickyContainer}>
        <img
          src={comicsInfo.imagetitle}
          alt={comicsInfo.title}
          className={styles.image}
        />
        <button className={styles.button}>Читать</button>
        <button className={`${styles.button} ${styles.bookmarkButton}`}>
          Добавить в закладки
        </button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'Описание' ? styles.activeTabButton : ''
            }`}
            onClick={() => setActiveTab('Описание')}
          >
            Описание
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'Главы' ? styles.activeTabButton : ''
            }`}
            onClick={() => setActiveTab('Главы')}
          >
            Главы
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'Комментарии' ? styles.activeTabButton : ''
            }`}
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
                {comicsInfo.genres.map((genre, index) => (
                  <span key={index} className={styles.tag}>{genre}</span>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'Главы' && (
            <div className={styles.chapters}>
              {chapters.map((chapter) => (
                <Link key={chapter.id} className={styles.chapter} to={`/reader/${chapter.id}`}>
                  <div className={styles.chapterTitle}>{chapter.title}</div>
                  <div className={styles.chapterDate}>{chapter.date}</div>
                </Link>
              ))}
            </div>
          )}
          {activeTab === 'Комментарии' && (
            <div className={styles.comments}>
              <p>Комментарии...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

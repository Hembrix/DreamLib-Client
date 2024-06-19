import React, { useState } from 'react';
import { Carousel } from '../Carousel/Carousel';
import { Card } from '../card/Card';
import { CardWithChapters } from '../card/CardwithChapters';
import styles from '../../styles/HomePage.module.css';
import { useGetRandomTitleListQuery, useGetNewPopularTitleListQuery, useGetNewTitleListQuery, useGetLastChaptersListQuery } from '../../store/dreamLibInjects/GetComicsHomePage';
import { Title } from '../types/TitleListInterface';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { data: randomTitleListData, isLoading: randomLoading, isError: randomError } = useGetRandomTitleListQuery(); 
    const { data: newPopularTitleListData, isLoading: popularLoading, isError: popularError } = useGetNewPopularTitleListQuery();
    const { data: newTitleListData, isLoading: newLoading, isError: newError } = useGetNewTitleListQuery();
    const { data: lastChaptersUpdateListData, isLoading: chaptersLoading, isError: chaptersError } = useGetLastChaptersListQuery();

    const [showMoreCount, setShowMoreCount] = useState(5);

    if (randomLoading || popularLoading || newLoading || chaptersLoading) return <div>Loading...</div>; 
    if (randomError || !randomTitleListData || !randomTitleListData.random_titles || popularError || !newPopularTitleListData || !newPopularTitleListData.popular_titles || newError || !newTitleListData || !newTitleListData.recent_titles || chaptersError || !lastChaptersUpdateListData || !lastChaptersUpdateListData.recent_chapters) return <div>Error...</div>; 
    
    const handleShowMore = () => {
        setShowMoreCount(prevCount => prevCount + 10);
    };

    return (
        <div className={styles.randomTitle}>
            <div className={styles.carouselWrapper}>
                <Carousel>
                    {randomTitleListData.random_titles.slice(0, 20).map((random_title: Title, index: number) => (
                        <Card 
                            key={index}
                            title={random_title.title}
                            type_of_work={random_title.type_of_work}
                            average_rating={random_title.average_rating}
                            imagetitle={random_title.imagetitle}
                            titleSlug={random_title.titleSlug}           
                        />
                    ))}
                </Carousel>
            </div>
            <div className={styles.page}>
                <Link to={`/newTop`} className={styles.topLink}>
                    <span>Топ новинок</span>
                </Link>
                <div className={styles.carouselWrapper}>
                    <Carousel>
                        {newPopularTitleListData.popular_titles.slice(0, 10).map((popular_title: Title, index: number) => (
                            <Card 
                                key={index}
                                title={popular_title.title}
                                type_of_work={popular_title.type_of_work}
                                average_rating={popular_title.average_rating}
                                imagetitle={popular_title.imagetitle}
                                titleSlug={popular_title.titleSlug}           
                            />
                        ))}
                    </Carousel>
                </div>
                <Link to={`/newTop`} className={styles.topLink}>
                    <span>Топ популярных новинок</span>
                </Link>
                <div className={styles.carouselWrapper}>
                    <Carousel>
                        {newTitleListData.recent_titles.slice(0, 10).map((recent_title: Title, index: number) => (
                            <Card 
                                key={index}
                                title={recent_title.title}
                                type_of_work={recent_title.type_of_work}
                                average_rating={recent_title.average_rating}
                                imagetitle={recent_title.imagetitle}
                                titleSlug={recent_title.titleSlug}           
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className={styles.page}> 
                <span>Последние обновления</span>
                <div className={styles.carouselWrapper}>
                        {lastChaptersUpdateListData.recent_chapters.slice(0, showMoreCount).map((recent_chapter: Title, index: number) => (
                            <CardWithChapters
                                key={index}
                                title={recent_chapter.title}
                                imagetitle={recent_chapter.imagetitle}
                                titleSlug={recent_chapter.titleSlug}  
                                chapter_number={recent_chapter.chapter_number}   
                                chapter={recent_chapter.chapter}       
                            />
                        ))}
                </div>
                {showMoreCount < lastChaptersUpdateListData.recent_chapters.length && (
                    <button onClick={handleShowMore}>Показать ещё</button>
                )}
            </div>
        </div>
    );
};

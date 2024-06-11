import React from 'react';
import { Carousel } from '../Carousel/Carousel';
import { Card } from '../card/Card';
import styles from '../../styles/HomePage.module.css';
import { useGetRandomTitleListQuery, useGetNewPopularTitleListQuery, useGetNewTitleListQuery } from '../../store/dreamLibInjects/GetComicsHomePage';
import { Title } from '../types/TitleListInterface';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { data: randomTitleListData, isLoading: randomLoading, isError: randomError } = useGetRandomTitleListQuery(); 
    const { data: newPopularTitleListData, isLoading: popularLoading, isError: popularError } = useGetNewPopularTitleListQuery();
    const { data: newTitleListData, isLoading: newLoading, isError: newError } = useGetNewTitleListQuery();

    if (randomLoading || popularLoading || newLoading) return <div>Loading...</div>; 
    if (randomError || !randomTitleListData || !randomTitleListData.random_titles || popularError || !newPopularTitleListData || !newPopularTitleListData.popular_titles || newError || !newTitleListData || !newTitleListData.recent_titles) return <div>Error...</div>; 
    
    return (
        <div className={styles.randomTitle}>
            <div>
                <Carousel>
                    {randomTitleListData.random_titles.map((random_titles: Title, index: number) => (
                        <Card 
                            key={index}
                            title={random_titles.title}
                            type_of_work={random_titles.type_of_work}
                            average_rating={random_titles.average_rating}
                            imagetitle={random_titles.imagetitle}
                            titleSlug={random_titles.titleSlug}           
                        />
                    ))}
                </Carousel>
            </div>
            <div className={styles.page}>
                <Link to={`/newTop}`}>
                    <span>Топ новинок</span>
                </Link>
                <Carousel>
                    {newPopularTitleListData.popular_titles.map((popular_titles: Title, index: number) => (
                        <Card 
                            key={index}
                            title={popular_titles.title}
                            type_of_work={popular_titles.type_of_work}
                            average_rating={popular_titles.average_rating}
                            imagetitle={popular_titles.imagetitle}
                            titleSlug={popular_titles.titleSlug}           
                        />
                    ))}
                </Carousel>
                <Link to={`/newTop}`}>
                    <span>Топ новинок</span>
                </Link>
                <Carousel>
                    {newTitleListData.recent_titles.map((recent_titles: Title, index: number) => (
                        <Card 
                            key={index}
                            title={recent_titles.title}
                            type_of_work={recent_titles.type_of_work}
                            average_rating={recent_titles.average_rating}
                            imagetitle={recent_titles.imagetitle}
                            titleSlug={recent_titles.titleSlug}           
                        />
                    ))}
                </Carousel>
            </div>
            <div className={styles.lastUpdate}>
                    {newTitleListData.recent_titles.map((recent_titles: Title, index: number) => (
                        <Card 
                            key={index}
                            title={recent_titles.title}
                            type_of_work={recent_titles.type_of_work}
                            average_rating={recent_titles.average_rating}
                            imagetitle={recent_titles.imagetitle}
                            titleSlug={recent_titles.titleSlug}           
                        />
                    ))}
            </div>
        </div>
    );
};

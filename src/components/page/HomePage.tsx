import React from 'react';
import { Carousel } from '../Carousel/Carousel';
import { Card } from '../card/Card';
import styles from '../../styles/HomePage.module.css';
import { useGetTitleListQuery } from '../../store/dreamLibInjects/GetComicsHomePage'; 
import { Title } from '../../components/types/TitleListInterfaceTypes';

export const HomePage: React.FC = () => {
    const { data: titleListData, isLoading, isError } = useGetTitleListQuery(); 

    if (isLoading) return <div>Loading...</div>; 
    if (isError || !titleListData || !titleListData.titles) return <div>Error...</div>; 

    return (
        <div className={styles.page}>
            <Carousel>
                {titleListData.titles.map((title: Title, index: number) => (
                    <Card 
                        key={index}
                        title={title.title}
                        type_of_work={title.type_of_work}
                        average_rating={title.average_rating}
                        imagetitle={title.imagetitle}
                        titleSlug={title.titleSlug} 
                        TitleName={title.TitleName}                    />
                ))}
            </Carousel>
        </div>
    );
};

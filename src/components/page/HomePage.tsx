import React from 'react';
import { Carousel } from '../Carousel/Carousel';
import { Card } from '../card/Card';
import styles from '../../styles/HomePage.module.css';

export const HomePage: React.FC = () => {
    const cardData = [
        {
            title: 'Абсолютный контроль',
            rating: 8.1,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Великий учитель Онизука',
            rating: 9.2,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Король школы',
            rating: 8.5,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Абсолютный контроль',
            rating: 8.1,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Великий учитель Онизука',
            rating: 9.2,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Король школы',
            rating: 8.5,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Абсолютный контроль',
            rating: 8.1,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Великий учитель Онизука',
            rating: 9.2,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        {
            title: 'Король школы',
            rating: 8.5,
            imageUrl: 'https://remanga.org/media/titles/my-dad-is-too-strong/408c298182436aec21cd983f9f70f7b7.jpg'
        },
        // Добавьте еще карточки здесь
    ];

    return (
        <div className={styles.page}>
            <Carousel>
                {cardData.map((card, index) => (
                    <Card key={index} title={card.title} rating={card.rating} imageUrl={card.imageUrl} />
                ))}
            </Carousel>
        </div>
    );
};

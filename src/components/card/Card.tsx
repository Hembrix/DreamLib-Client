import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { Title } from '../types/TitleListInterfaceTypes';
import { BASE_URL } from '../utils/baseUrl';



export const Card: React.FC<Title> = ({ imagetitle, title, titleSlug, type_of_work, average_rating }) => {
    return (
        <Link to={`/comics/${titleSlug}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={`${BASE_URL}${imagetitle}`} alt={'Обложка'} className={styles.image} />
            </div>
            <p className={styles.subtitle}>
               <span className={styles.rating}>{type_of_work}</span>
            </p>
            <p className={styles.subtitle}>
                <span className={styles.rating}>{average_rating} ★</span>
            </p>
            <h2 className={styles.title}>{title}</h2>
        </Link>
    );
};
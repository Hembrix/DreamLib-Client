import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';


export const Card: React.FC<{ title: string, rating: number, imageUrl: string }> = ({ title, rating, imageUrl }) => {
    return (
        <Link to='comics' className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={title} className={styles.image} />
            </div>
            <p className={styles.subtitle}>Манхва <span className={styles.rating}>{rating} ★</span></p>
            <h2 className={styles.title}>{title}</h2>
        </Link>
    );
};

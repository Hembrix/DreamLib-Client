import React from 'react';
import styles from '../../styles/Carousel.module.css';

interface CarouselProps {
    children: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {children}
            </div>
        </div>
    );
};

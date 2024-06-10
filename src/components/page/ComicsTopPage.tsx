import React from 'react';
import { useGetComicsTopListQuery } from '../../store/dreamLibInjects/GetComicsTop';
import { Title } from '../types/TitleListInterface';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/baseUrl';

export const ComicsTopPage: React.FC = () => {
    const { data } = useGetComicsTopListQuery();

    return (
        <div>
            <h2>Top Manga Titles</h2>
            <ul>
                {data?.top_titles.map((title: Title) => (
                    <li key={title.titleSlug}>
                        <Link to={`/comics/${title.titleSlug}`} className="card">
                            <div className="imageContainer">
                                <img src={`${BASE_URL}${title.imagetitle}`} alt="Обложка" className="image" />
                            </div>
                            <span>💬{title.comment_count}</span>
                            <p className="subtitle">        
                                <span className="rating">{title.type_of_work} <span className="rating">{title.average_rating} ★</span></span>
                            </p>
                            <h2 className="title">{title.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
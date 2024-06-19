import React from "react";
import { Link } from "react-router-dom";
import style from "./CardwithChapters.module.css";
import { BASE_URL } from "../utils/baseUrl";
import { Title } from "../types/TitleListInterface";

export const CardWithChapters: React.FC<Title> = ({ imagetitle, title, titleSlug, chapter_number, chapter }) => {
    return (
        <div className={style.card}> 
            <div className={style.imgContainer}>
                <Link to={`/comics/${titleSlug}`} className={style.link}>
                    <img src={`${BASE_URL}${imagetitle}`} alt={'Обложка'} className={style.image}/>
                </Link>
            </div>
            <div className={style.textContainer}>
                <Link to={`/comics/${titleSlug}`} className={style.link}>
                    <h6 className={style.title}>{title}</h6>
                </Link>
                <Link to={`/comics/${titleSlug}/${chapter_number}`} className={style.link}>
                    <p className={style.chapterTitle}>Глава {chapter_number} - {chapter}</p>
                </Link>
            </div>
        </div>
    );
};

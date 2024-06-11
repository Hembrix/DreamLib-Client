export interface Chapter {
    page_number: number;
    image_data: string;
    chapter_count:number;
}

    export interface Pages {
        chapter_number: number;
        pages: Chapter[]; 
    }

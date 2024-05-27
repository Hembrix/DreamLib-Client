export interface Chapter {
    page_number: number;
    image_data: string;
}

    export interface Pages {
        chapter_number: number;
        pages: Chapter[]; 
    }

export interface Title {
  imagetitle: string;
  title: string;
  titleSlug: string;
  type_of_work?: string;
  average_rating?: number;
  comment_count?: number;
  upload_date?:number;
  chapter?:string;
  chapter_number?:number;
}

export interface randomTitleList {
  random_titles: Title[];
}
export interface newPopularTitleList {
  popular_titles: Title[];
}


export interface newTitleList{
  recent_titles:Title[]
}
export interface LastChaptersUpdateList{
  recent_chapters:Title[]
}

export interface TopTitleList {
  top_titles: Title[];
}
export interface Title {
  imagetitle: string;
  title: string;
  titleSlug: string;
  type_of_work: string;
  average_rating: number;
  comment_count?: number;
}

export interface TitleList {
  titles: Title[];
}

export interface TopTitleList {
  top_titles: Title[];
}

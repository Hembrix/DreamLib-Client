import { baseApi } from "../../components/utils/ApiReducer";
import { Titles } from "../../components/types/TitleListInterfaceTypes";

export const api = baseApi.injectEndpoints({
  endpoints: build => ({
    getChapter: build.query({
      query: ({ titleSlug, chapterNumber }: { titleSlug: string, chapterNumber: string }) => ({
        url: `api/manga/${titleSlug}/v1/c${chapterNumber}/`
      })
    }),
    getChapterList: build.query({
      query: (titleSlug) => ({
        url: `api/chapters/${titleSlug}/`
      })
    }),
    getTitleList: build.query<Titles, void>({
      query: () => ({
        url: 'api/home-detail/'
      })
    }),
    GetTitle: build.query({
      query: (titleSlug) => ({
        url: `api/manga/${titleSlug}/`
      })
    })
  })    
})

export const { 
  useGetChapterQuery, 
  useGetChapterListQuery, 
  useGetTitleListQuery, 
  useGetTitleQuery 
} = api;

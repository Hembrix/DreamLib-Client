import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapter: builder.query({
      query: ({ titleSlug, chapterNumber }:{ titleSlug: string, chapterNumber: number }) => ({
        url: `api/manga/${titleSlug}/c${chapterNumber}/`
      })
    })    
  })    
})

export const { useGetChapterQuery } = api;

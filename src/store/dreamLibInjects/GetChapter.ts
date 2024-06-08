import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapter: builder.query({
      query: ({ titleSlug, chapterNumber }: { titleSlug: string, chapterNumber: string }) => ({
        url: `api/manga/${titleSlug}/v1/c${chapterNumber}/`
      })
    })    
  })    
})

export const { useGetChapterQuery } = api;

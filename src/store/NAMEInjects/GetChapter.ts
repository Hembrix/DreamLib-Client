import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getChapterApi = createApi({
  reducerPath: 'getChapterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000'
  }),
  endpoints: build => ({
    getChapter: build.query({
      query: ({ titleSlug, chapterNumber }: { titleSlug: string, chapterNumber: string }) => ({
        url: `api/manga/${titleSlug}/v1/c${chapterNumber}/`
      })
    })    
  })    
})

export const { useGetChapterQuery } = getChapterApi;

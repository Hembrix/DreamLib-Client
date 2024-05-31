import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getChapterListApi = createApi({
  reducerPath: 'getChapterListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000'
  }),
  endpoints: build => ({
    getChapterList: build.query({
      query: (titleSlug) => ({
        url: `api/chapters/${titleSlug}/`
      })
    })    
  })    
})

export const { useGetChapterListQuery } = getChapterListApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getTitleApi = createApi({
  reducerPath: 'getTitleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000'
  }),
  endpoints: build => ({
    GetTitle: build.query({
      query: (titleSlug) => ({
        url: `api/manga/${titleSlug}/`
      })
    })
  })    
})

export const { useGetTitleQuery } = getTitleApi;

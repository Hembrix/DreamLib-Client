import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapterList: builder.query({
      query: (titleSlug) => ({
        url: `api/chapters/${titleSlug}/`
      })
    })    
  })    
})

export const { useGetChapterListQuery } = api;


import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetTitle: builder.query({
      query: (titleSlug) => ({
        url: `api/manga/${titleSlug}/`
      })
    })
  })    
})

export const { 
  useGetTitleQuery 
} = api;

import { newPopularTitleList, newTitleList, randomTitleList, LastChaptersUpdateList  } from "../../components/types/TitleListInterface";
import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRandomTitleList: builder.query<randomTitleList, void>({
      query: () => ({
        url: 'api/home/random/'
      })
    }),
    getNewPopularTitleList: builder.query<newPopularTitleList, void>({
      query: () => ({
        url: 'api/home/popular/'
      })
    }),
    getNewTitleList: builder.query<newTitleList, void>({
      query: () => ({
        url: 'api/home/recent/'
      })
    }),
    getLastChaptersList: builder.query<LastChaptersUpdateList, void>({
      query: () => ({
        url: 'api/home/recent-chapters/'
      })
    })
  })
      
})
  

export const {  
    useGetRandomTitleListQuery,
    useGetNewPopularTitleListQuery,
    useGetNewTitleListQuery,
    useGetLastChaptersListQuery
} = api;
import { newPopularTitleList, newTitleList, randomTitleList } from "../../components/types/TitleListInterface";
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
    })
  })
      
})
  

export const {  
    useGetRandomTitleListQuery,
    useGetNewPopularTitleListQuery,
    useGetNewTitleListQuery
} = api;
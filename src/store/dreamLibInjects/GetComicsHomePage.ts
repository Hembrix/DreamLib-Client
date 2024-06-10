import { Titles } from "../../components/types/TitleListInterface";
import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTitleList: builder.query<Titles, void>({
      query: () => ({
        url: 'api/home-detail/'
      })
    })
  })    
})
  

export const {  
    useGetTitleListQuery
} = api;
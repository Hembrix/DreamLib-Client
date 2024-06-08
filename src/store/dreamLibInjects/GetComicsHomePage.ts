import { baseApi } from "../../components/utils/baseUrl";
import { Titles } from "../../components/types/TitleListInterfaceTypes";

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
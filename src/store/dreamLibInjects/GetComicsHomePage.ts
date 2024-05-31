import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Titles } from "../../components/types/TitleListInterfaceTypes";

export const getTitleListApi = createApi({
  reducerPath: 'getTitleListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000'
  }),
  endpoints: build => ({
    getTitleList: build.query<Titles, void>({
      query: () => ({
        url: 'api/home-detail/'
      })
    })
  })    
})

export const { useGetTitleListQuery } = getTitleListApi;


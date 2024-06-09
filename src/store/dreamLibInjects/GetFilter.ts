import { FilterData } from "../../components/types/Filter";
import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.query<FilterData,void>({
      query: () => ({
        url: `api/catalog-filters/`
      })
    })    
  })    
})

export const { useGetFiltersQuery } = api;

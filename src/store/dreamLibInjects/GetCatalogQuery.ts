import { baseApi } from "../../components/utils/baseUrl";
import { FilterParams } from "../../components/types/FilterTitles";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalog: builder.query({
      query: (params: FilterParams) => ({
        url: 'api/filter_titles/',
        params: {
          type: params.title_types,
          genres: params.genres?.join(','),
          status: params.status,
          translation_status: params.translation_status,
          min_rating: params.min_rating,
          max_rating: params.max_rating,
          min_year: params.min_year,
          max_year: params.max_year,
          min_chapters: params.min_chapters,
          max_chapters: params.max_chapters,
        },
      }),
    }),
  }),
});

export const { useGetCatalogQuery } = api;

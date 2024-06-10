import { baseApi } from "../../components/utils/baseUrl";
import { Title } from '../../components/types/TitleListInterface';

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchTitles: builder.query<Title[], string>({
      query: (searchTerm) => `api/search/?q=${searchTerm}`,
    }),
  }),
});

export const { useSearchTitlesQuery } = api;

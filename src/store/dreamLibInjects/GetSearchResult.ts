
import { baseApi } from "../../components/utils/baseUrl";
import { Title } from '../../components/types/TitleListInterfaceTypes';



export const api = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    searchTitles: builder.query<Title[], string>({
      query: (searchTerm) => `search/?q=${searchTerm}`,
    }),
  }),
});

export const { useSearchTitlesQuery } = api;

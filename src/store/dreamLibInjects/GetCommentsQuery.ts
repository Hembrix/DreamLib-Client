import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (titleSlug) => `api/manga/${titleSlug}/comments/`,
    }),
  }),
});

export const { useGetCommentsQuery } = api;

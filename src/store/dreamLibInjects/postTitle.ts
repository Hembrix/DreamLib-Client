// postTitle.ts

import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTitle: builder.mutation({
      query: (formData: FormData) => ({
        url: 'api/add/titles/',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { usePostTitleMutation } = api;

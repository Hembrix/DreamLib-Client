// postTitle.ts

import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTitle: builder.mutation({
      query: (formData: FormData) => ({
        url: 'api/add/titles/${titleSlug}',
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
  }),
});

export const { usePostTitleMutation } = api;

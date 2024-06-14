// store/dreamLibInjects/addChapter.ts

import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addChapter: builder.mutation({
      query: (formData: FormData) => ({
        url: 'api/add/chapter/',
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
  }),
});

export const { useAddChapterMutation } = api;

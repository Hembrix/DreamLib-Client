// dreamLibInjects/postChapter.ts

import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addChapter: builder.mutation<File, { formData: FormData; titleSlug: string }>({
      query: ({ formData, titleSlug }) => ({
        url: `api/put/titles/${titleSlug}/`,
        method: 'PUT',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
  }),
});

export const { useAddChapterMutation } = api;

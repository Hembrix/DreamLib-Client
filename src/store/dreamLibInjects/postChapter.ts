import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addChapter: builder.mutation<File, { formData: FormData; titleSlug: string }>({
      query: ({ formData, titleSlug }) => ({
        url: `api/add/chapter/${titleSlug}/`,
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

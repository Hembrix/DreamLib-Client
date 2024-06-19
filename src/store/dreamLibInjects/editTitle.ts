// editTitle.ts

import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        editTitle: builder.mutation({
          query: ({ formData, titleSlug }: { formData: FormData; titleSlug: string }) => ({
            url: `api/put/titles/${titleSlug}/`, // Добавляем titleslug в URL для редактирования
            method: 'PUT',
            body: formData,
            headers: {
              'Accept': 'application/json',
        },
      }),
    }),
    deleteTitle: builder.mutation({
      query: (titleSlug: string) => ({
        url: `api/del/titles/${titleSlug}`, // URL для удаления произведения
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useEditTitleMutation, useDeleteTitleMutation } = api;

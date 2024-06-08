import { baseApi } from "../../components/utils/baseUrl";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData: { username: string; email: string; password: string }) => ({
        url: 'api/register/',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: (formData: { username: string; password: string }) => ({
        url: 'api/login/',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

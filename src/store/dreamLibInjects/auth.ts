import { baseApi } from "../../components/utils/baseUrl";

interface RegisterResponse {
  user: { username: string; email: string;groups:string,image:string  };
  refresh: string;
  access: string;
}

export interface LoginResponse {
  user: { username: string; email: string;groups:string,image:string };
  refresh: string;
  access: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (formData) => ({
        url: 'api/register/',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (formData) => ({
        url: 'api/login/',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

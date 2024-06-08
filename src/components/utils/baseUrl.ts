

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASE_URL = 'http://127.0.0.1:8000';
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: () => ({})
});

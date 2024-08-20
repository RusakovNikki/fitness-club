import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  tagTypes: [
    'updateUser',
    'updateUserList',
    'updateInventory',
    'updateTrainings',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.MODE === "production" ? "http://localhost/api/" : `${process.env.API}/api/`}),
  endpoints: () => ({}),
});

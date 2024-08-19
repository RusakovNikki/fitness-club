import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  tagTypes: [
    'updateUser',
    'updateUserList',
    'updateInventory',
    'updateTrainings',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API ? `${process.env.API}/api/` : 'http://localhost:8080/api/' }),
  endpoints: () => ({}),
});

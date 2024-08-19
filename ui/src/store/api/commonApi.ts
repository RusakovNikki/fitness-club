import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  tagTypes: [
    'updateUser',
    'updateUserList',
    'updateInventory',
    'updateTrainings',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.DOMEN ?? "localhost"}:${process.env.PORT ?? "8080" }/api/`}),
  endpoints: () => ({}),
});

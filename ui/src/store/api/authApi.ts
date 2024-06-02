import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthLoginRequest, IAuthLoginResponse } from '../../interfaces/auth';
import { commonApi } from './commonApi';

export const authApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<IAuthLoginResponse, IAuthLoginRequest>({
      query: (body) => {
        return {
          url: '/auth/signin',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useUserLoginMutation } = authApi;

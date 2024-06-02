import { IUser } from '../../interfaces/user';
import { ERoles } from '../../enums/roles';
import { commonApi } from './commonApi';
import { EStatuses } from '../../enums/statuses';

export const userApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, { userId: number; token: string }>({
      query: (data) => ({
        url: `v1/users/${data.userId}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${data.token}` },
      }),
      providesTags: ['updateUser'],
    }),
    getUsers: builder.query<IUser[], string>({
      query: (token) => ({
        url: `v1/users`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['updateUserList'],
    }),
    getUsersByUsername: builder.query<
      IUser[],
      { username: string; token: string }
    >({
      query: (data) => ({
        url: `v1/users/search?name=${data.username}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${data.token}` },
      }),
      providesTags: ['updateUser'],
    }),
    updateUserStatus: builder.mutation<
      boolean,
      { userId: number; status: EStatuses; token: string }
    >({
      query: ({ status, token, userId }) => ({
        url: `v1/users/${userId}/update-status?status=${status}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['updateUserList'],
    }),
    createUser: builder.mutation<
      IUser,
      {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        roles?: ERoles[];
        token: string;
      }
    >({
      query: (body) => {
        return {
          url: `/auth/signup`,
          method: 'POST',
          headers: { Authorization: `Bearer ${body.token}` },
          body: { ...body, password: '12345678' },
        };
      },
    }),
    getUsersByRole: builder.query<IUser[], { role: ERoles; token: string }>({
      query: ({ role, token }) => ({
        url: `v1/users?role=${role}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    joinUserToGroupTraining: builder.mutation<
      void,
      { userId: number; trainingId: number; token: string }
    >({
      query: ({ token, trainingId, userId }) => ({
        url: `v1/trainings/${trainingId}?userId=${userId}`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['updateTrainings'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useGetUsersByUsernameQuery,
  useLazyGetUsersByUsernameQuery,
  useUpdateUserStatusMutation,
  useGetUsersByRoleQuery,
  useLazyGetUsersByRoleQuery,
  useJoinUserToGroupTrainingMutation,
} = userApi;

import { ISubscription } from '../../interfaces/subscription';
import { IUser } from '../../interfaces/user';
import { commonApi } from './commonApi';

export const subscriptionApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<ISubscription[], string>({
      query: (token) => ({
        url: `v1/subscriptions`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    addUserToSubscription: builder.mutation<
      IUser,
      { subscriptionId: number; userId: number; token: string }
    >({
      query: (data) => {
        return {
          url: `v1/users/${data.userId}/add-subscription?subscriptionId=${data.subscriptionId}`,
          method: 'PUT',
          headers: { Authorization: `Bearer ${data.token}` },
        };
      },
      invalidatesTags: ['updateUser'],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useLazyGetSubscriptionsQuery,
  useAddUserToSubscriptionMutation,
} = subscriptionApi;

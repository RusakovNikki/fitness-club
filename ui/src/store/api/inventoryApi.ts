import { IInventory } from '../../interfaces/inventory';
import { commonApi } from './commonApi';

export const inventoryApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<IInventory[], string>({
      query: (token) => ({
        url: `v1/inventory`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['updateInventory'],
    }),
    createNewInventory: builder.mutation<
      void,
      { inventoryName: string; token: string }
    >({
      query: ({ inventoryName, token }) => ({
        url: `v1/inventory`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          name: inventoryName,
        },
      }),
      invalidatesTags: ['updateInventory'],
    }),
    assignUserToInventory: builder.mutation<
      void,
      { inventoryId: number; userId: number; token: string }
    >({
      query: ({ inventoryId, token, userId }) => ({
        url: `v1/inventory/${inventoryId}/assign-user?userId=${userId}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['updateInventory'],
    }),
    removeUserFromInventory: builder.mutation<
      void,
      { inventoryId: number; token: string }
    >({
      query: ({ inventoryId, token }) => ({
        url: `v1/inventory/${inventoryId}/remove-user`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['updateInventory'],
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useLazyGetInventoryQuery,
  useAssignUserToInventoryMutation,
  useRemoveUserFromInventoryMutation,
  useCreateNewInventoryMutation,
} = inventoryApi;

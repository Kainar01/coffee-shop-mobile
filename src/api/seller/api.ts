import { createApi } from '@reduxjs/toolkit/query/react';
import { Item } from 'features/admin/admin.interface';
import { baseQuery } from '..';
import { CreateStaffRequest, ItemGroupWithCount, Purchase, PurchaseRequest, UserPurchaseItems } from './types';

export const SELLER_API_REDUCER_KEY = 'sellerApi';

const sellerApi = createApi({
  reducerPath: SELLER_API_REDUCER_KEY,
  baseQuery,
  tagTypes: ['ITEM_LIST', 'ITEM_GROUP_LIST', 'USER_ITEM_LIST', 'PURCHASE_LIST'],
  endpoints: (builder) => ({
    createSeller: builder.mutation<undefined, CreateStaffRequest>({
      query: (data) => ({
        url: '/franchise/seller',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ITEM_LIST' }],
    }),
    getUserItems: builder.query<UserPurchaseItems, string>({
      query: (username) => ({
        url: `/item/user/${username}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'USER_ITEM_LIST' }],
    }),
    getItemGroups: builder.query<Array<ItemGroupWithCount>, null>({
      query: () => ({
        url: '/item-group',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'ITEM_GROUP_LIST' }],
    }),
    getGroupItems: builder.query<Array<Item>, number>({
      query: (id) => ({
        url: `/item/byGroup/${id}`,
        method: 'GET',
      }),
    }),
    purchase: builder.mutation<undefined, PurchaseRequest>({
      query: ({ username, ...data }) => ({
        url: `/purchase/user/${username}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'USER_ITEM_LIST' }, { type: 'PURCHASE_LIST' }],
    }),
    getUserPurchases: builder.query<Array<Purchase>, number>({
      query: (userId) => ({
        url: `/purchase/user/${userId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'PURCHASE_LIST' }],
    }),
    getSellerPurchases: builder.query<Array<Purchase>, number>({
      query: (sellerId) => ({
        url: `/purchase/seller/${sellerId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'PURCHASE_LIST' }],
    }),
  }),
});

export default sellerApi;

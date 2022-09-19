import { createApi } from '@reduxjs/toolkit/query/react';
import { Item } from 'features/admin/admin.interface';
import { FranchiseItem } from 'features/franchise/franchise.interface';
import { SellerWorkStats, WorkingTrack } from 'features/seller/seller.interface';
import { baseQueryWithLogout } from '..';
import {
  CreateStaffRequest,
  GetFranshiseGroupItemsRequest,
  ItemGroupWithCount,
  Purchase,
  PurchaseRequest,
  PurchaseStatusUpdateRequest,
  UserPurchaseItems,
} from './types';

export const SELLER_API_REDUCER_KEY = 'sellerApi';

const sellerApi = createApi({
  reducerPath: SELLER_API_REDUCER_KEY,
  baseQuery: baseQueryWithLogout,
  tagTypes: ['ITEM_LIST', 'ITEM_GROUP_LIST', 'USER_ITEM_LIST', 'PURCHASE_LIST', 'FRANCHISE_ITEMS'],
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
      keepUnusedDataFor: 5,
    }),
    purchase: builder.mutation<undefined, PurchaseRequest>({
      query: ({ username, ...data }) => ({
        url: `/purchase/user/${username}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'USER_ITEM_LIST' }, { type: 'PURCHASE_LIST' }, { type: 'FRANCHISE_ITEMS' }],
    }),
    getUserPurchases: builder.query<Array<Purchase>, number>({
      query: (userId) => ({
        url: `/purchase/user/${userId}`,
        method: 'GET',
      }),
    }),
    getSellerPurchases: builder.query<Array<Purchase>, number>({
      query: (sellerId) => ({
        url: `/purchase/seller/${sellerId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'PURCHASE_LIST' }],
    }),
    updatePurchase: builder.mutation<undefined, PurchaseStatusUpdateRequest>({
      query: ({ purchaseId, status }) => ({
        url: `/purchase/${purchaseId}/status/${status}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'PURCHASE_LIST' }],
    }),
    getFranchiseGroupItems: builder.query<Array<FranchiseItem>, GetFranshiseGroupItemsRequest>({
      query: ({ franchiseId, itemGroupId }) => ({
        url: `/item/sale/${franchiseId}/byGroup/${itemGroupId}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'FRANCHISE_ITEMS' }],
    }),
    startWorkingDay: builder.mutation<WorkingTrack, string>({
      query: (secret) => ({
        url: `/seller/startWorkDay/${secret}`,
        method: 'POST',
      }),
    }),
    endWorkingDay: builder.mutation<WorkingTrack, string>({
      query: (secret) => ({
        url: `/seller/endWorkDay/${secret}`,
        method: 'POST',
      }),
    }),
    sellerWorkStats: builder.query<SellerWorkStats, number>({
      query: (sellerId) => ({
        url: `/seller/workStats/${sellerId}`,
        method: 'GET',
      }),
    }),
  }),
});

export default sellerApi;

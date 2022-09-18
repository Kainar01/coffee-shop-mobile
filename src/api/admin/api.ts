import { createApi } from '@reduxjs/toolkit/query/react';
import { Franchise, Item } from 'features/admin/admin.interface';
import { baseQuery } from '..';
import { AdminItemGroup, CreateFranchiseRequest, CreateItemGroupRequest, CreateItemRequest } from './types';

export const ADMIN_API_REDUCER_KEY = 'adminApi';

const adminApi = createApi({
  reducerPath: ADMIN_API_REDUCER_KEY,
  baseQuery,
  tagTypes: ['FRANCHISE_LIST', 'ITEM_GROUP_LIST', 'ITEM_LIST'],
  endpoints: (builder) => ({
    createFranchise: builder.mutation<undefined, CreateFranchiseRequest>({
      query: (data) => ({
        url: '/franchise',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'FRANCHISE_LIST' }],
    }),
    getFranchises: builder.query<Array<Franchise>, null>({
      query: () => ({
        url: '/franchise',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'FRANCHISE_LIST' }],
    }),
    createItemGroup: builder.mutation<undefined, CreateItemGroupRequest>({
      query: (data) => ({
        url: '/item-group',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ITEM_GROUP_LIST' }],
    }),
    getItemGroups: builder.query<Array<AdminItemGroup>, null>({
      query: () => ({
        url: '/item-group',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'ITEM_GROUP_LIST' }],
    }),
    createItem: builder.mutation<undefined, CreateItemRequest>({
      query: (data) => ({
        url: '/item',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_res, _q, args) => [{ type: 'ITEM_LIST', id: args.itemGroupId }, { type: 'ITEM_GROUP_LIST' }],
    }),
    getGroupItems: builder.query<Array<Item>, number>({
      query: (id) => ({
        url: `/item/byGroup/${id}`,
        method: 'GET',
      }),
      providesTags: (_r, _q, args) => [{ type: 'ITEM_LIST', id: args }],
    }),
  }),
});

export default adminApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { Purchase } from 'api/seller/types';
import { FranchiseItem, PurchaseStats, QRVerification } from 'features/franchise/franchise.interface';
import { Seller } from 'features/seller/seller.interface';
import { baseQuery } from '..';
import { CreateStaffRequest, GetFranshiseGroupItemsRequest } from './types';

export const FRANCHISE_API_REDUCER_KEY = 'franchiseApi';

const franchiseApi = createApi({
  reducerPath: FRANCHISE_API_REDUCER_KEY,
  baseQuery,
  tagTypes: ['STAFF_LIST', 'WORKING_TRACK', 'FRANCHISE_ITEMS', 'FRANCHISE_STATS', 'FRANCHISE_PURCHASES'],
  endpoints: (builder) => ({
    createSeller: builder.mutation<undefined, CreateStaffRequest>({
      query: (data) => ({
        url: '/franchise/seller',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'STAFF_LIST' }],
    }),
    getSellers: builder.query<Array<Seller>, null>({
      query: () => ({
        url: '/franchise/seller',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'STAFF_LIST' }],
    }),
    getFranchiseGroupItems: builder.query<Array<FranchiseItem>, GetFranshiseGroupItemsRequest>({
      query: ({ franchiseId, itemGroupId }) => ({
        url: `/item/sale/${franchiseId}/byGroup/${itemGroupId}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'FRANCHISE_ITEMS' }],
    }),
    updateFranchiseItem: builder.mutation<void, Partial<FranchiseItem> & { franchiseId: number }>({
      query: ({ id, franchiseId, ...data }) => ({
        url: `/item/${id}/franchise/${franchiseId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'FRANCHISE_ITEMS' }],
    }),
    getFranchisePurchases: builder.query<Array<Purchase>, number>({
      query: (franchiseId) => ({
        url: `/purchase/franchise/${franchiseId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'FRANCHISE_PURCHASES' }],
    }),
    generateQRVerificationSecret: builder.mutation<QRVerification, null>({
      query: () => ({
        url: '/franchise/generateVerification',
        method: 'POST',
      }),
    }),
    getPurchaseStats: builder.query<PurchaseStats, number>({
      query: (franchiseId) => ({
        url: `/purchase/franchise/${franchiseId}/stats`,
        method: 'GET',
      }),
      providesTags: [{ type: 'FRANCHISE_STATS' }],
    }),
  }),
});

export default franchiseApi;

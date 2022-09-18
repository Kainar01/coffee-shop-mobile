import { createApi } from '@reduxjs/toolkit/query/react';
import { Seller } from 'features/seller/seller.interface';
import { baseQuery } from '..';
import { CreateStaffRequest } from './types';

export const FRANCHISE_API_REDUCER_KEY = 'franchiseApi';

const franchiseApi = createApi({
  reducerPath: FRANCHISE_API_REDUCER_KEY,
  baseQuery,
  tagTypes: ['STAFF_LIST', 'WORKING_TRACK'],
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
  }),
});

export default franchiseApi;

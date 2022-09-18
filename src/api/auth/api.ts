import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export default authApi;

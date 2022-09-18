import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from 'features/auth/auth.slice';
import { AppState } from 'store';
import { API_URL } from '../config';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      authSlice: { token },
    } = getState() as AppState;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

export const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const {
      authSlice: { token },
    } = api.getState() as AppState;
    if (token) api.dispatch(logout());
  }
  return result;
};

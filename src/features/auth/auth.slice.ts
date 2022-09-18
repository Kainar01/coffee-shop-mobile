import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import authApi from 'api/auth/api';
import { persistReducer } from 'redux-persist';
import type { AuthState } from './auth.interface';

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage: AsyncStorage,
    whitelist: ['token', 'user'],
  },
  authSlice.reducer,
);

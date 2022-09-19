import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/auth/api';
import { WorkingTrack } from 'features/seller/seller.interface';
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
    makeQrGenerator(state) {
      if (state.user?.franchise) state.user.franchise.isQRGenerator = true;
    },
    setSellerWorkingTrack(state, { payload }: PayloadAction<WorkingTrack>) {
      console.log(payload, 'PAYLOAD');
      if (state.user?.seller) {
        state.user.seller.workingTrack = payload;
      }
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
    // builder.addMatcher(sellerApi.endpoints.startWorkingDay.matchFulfilled, (state, { payload }) => {
    //   if (state.user?.seller) {
    //     state.user.seller.workingTrack = payload;
    //   }
    // });
    // builder.addMatcher(sellerApi.endpoints.endWorkingDay.matchFulfilled, (state, { payload }) => {
    //   console.log(state.user);
    //   if (state.user?.seller) {
    //     state.user.seller.workingTrack = payload;
    //   }
    // });
  },
});

export const { logout, makeQrGenerator, setSellerWorkingTrack } = authSlice.actions;

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage: AsyncStorage,
    whitelist: ['token', 'user'],
  },
  authSlice.reducer,
);

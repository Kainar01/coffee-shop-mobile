import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import adminApi, { ADMIN_API_REDUCER_KEY } from 'api/admin/api';
import franchiseApi, { FRANCHISE_API_REDUCER_KEY } from 'api/franchise/api';
import sellerApi, { SELLER_API_REDUCER_KEY } from 'api/seller/api';
import { authReducer, authSlice } from 'features/auth/auth.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import authApi, { AUTH_API_REDUCER_KEY } from '../api/auth/api';

const reducers = {
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [ADMIN_API_REDUCER_KEY]: adminApi.reducer,
  [FRANCHISE_API_REDUCER_KEY]: franchiseApi.reducer,
  [SELLER_API_REDUCER_KEY]: sellerApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, adminApi.middleware, franchiseApi.middleware, sellerApi.middleware]),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

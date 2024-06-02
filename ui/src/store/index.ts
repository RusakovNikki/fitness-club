import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import { commonApi } from './api/commonApi';

const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
  auth: authReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(commonApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthLoginResponse } from '../../interfaces/auth';
import { RootState } from '..';

const initialState: IAuthLoginResponse = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthData: (state, action: PayloadAction<IAuthLoginResponse>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...action.payload,
        }),
      );
      // Обновляем состояние, используя Spread оператор
      return { ...state, ...action.payload };
    },
    logOut: (state) => {
      localStorage.clear();
      return {}; // Возвращаем пустой объект
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUserAuthData, logOut } = authSlice.actions;
export default authSlice.reducer;

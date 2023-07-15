import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  email: string;
  accessToken: string;
}

const initialState: IUser = {
  email: localStorage.getItem('userEmail') || '',
  accessToken: localStorage.getItem('accessToken') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem('userEmail', action.payload);
    },

    clearUserEmail: (state) => {
      state.email = '';
      localStorage.removeItem('userEmail');
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },

    clearAccessToken: (state) => {
      state.accessToken = '';
      localStorage.removeItem('accessToken');
    },
  },
});

export const {
  setUserEmail,
  clearUserEmail,
  setAccessToken,
  clearAccessToken,
} = userSlice.actions;

export default userSlice.reducer;

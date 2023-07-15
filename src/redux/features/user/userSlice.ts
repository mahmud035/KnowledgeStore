import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  email: string;
}

const initialState: IUser = {
  email: localStorage.getItem('userEmail') || '',
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
  },
});

export const { setUserEmail, clearUserEmail } = userSlice.actions;
export default userSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/globalTypes';

interface BookState {
  books: IBook[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getTenBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },

    getBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },
  },
});

export const { getTenBooks, getBooks } = bookSlice.actions;

export default bookSlice.reducer;

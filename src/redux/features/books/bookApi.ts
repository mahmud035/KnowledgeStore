import { api } from '../../api/apiSlice';

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTenBooks: builder.query({
      query: () => '/api/v1/books',
      providesTags: ['books'],
    }),

    getAllBooks: builder.query({
      query: (number: number) => `/api/v1/books?limit=${number}`,
      providesTags: ['books'],
    }),
  }),
});

export const { useGetTenBooksQuery, useGetAllBooksQuery } = bookApi;

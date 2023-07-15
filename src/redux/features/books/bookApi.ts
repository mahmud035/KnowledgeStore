import { api } from '../../api/apiSlice';

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTenBooks: builder.query({
      query: () => '/api/v1/books',
      providesTags: ['books'],
    }),

    getBooks: builder.query({
      query: (limit: number) => `/api/v1/books/?limit=${limit}`,
      providesTags: ['books'],
    }),
  }),
});

export const { useGetTenBooksQuery, useGetBooksQuery } = bookApi;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IAddBook } from '../../../components/AddNewBookForm';
import { IEditBook } from '../../../components/EditBookForm';
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

    getBookDetails: builder.query({
      query: (id) => `/api/v1/books/${id}`,
      providesTags: ['books', 'reviews'],
    }),

    postBook: builder.mutation({
      query: (data: IAddBook) => ({
        url: `/api/v1/books/add-book`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books'],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }: { id: string; data: IEditBook }) => ({
        url: `/api/v1/books/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books', 'reviews'],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
    }),

    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/add-review/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books', 'reviews'],
    }),
  }),
});

export const {
  useGetTenBooksQuery,
  useGetBooksQuery,
  usePostBookMutation,
  useGetBookDetailsQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddReviewMutation,
} = bookApi;

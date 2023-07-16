/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from '../../api/apiSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/api/v1/users/wishlist',
      providesTags: ['books', 'wishlist'],
    }),

    getReadingList: builder.query({
      query: () => '/api/v1/users/reading-list',
      providesTags: ['books', 'readingList'],
    }),

    getFinishedBookList: builder.query({
      query: () => '/api/v1/users/finish-list',
      providesTags: ['books', 'finishedReading'],
    }),

    signup: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: { email, password },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),

    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/api/v1/users/wishlist/add`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books', 'wishlist'],
    }),

    addToReadingList: builder.mutation({
      query: (data) => ({
        url: `/api/v1/users/reading-list/add`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books', 'readingList'],
    }),

    markAsFinished: builder.mutation({
      query: (data) => ({
        url: `/api/v1/users/reading-list/finish`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }),
      invalidatesTags: ['books', 'finishedReading'],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useGetReadingListQuery,
  useGetFinishedBookListQuery,
  useSignupMutation,
  useLoginMutation,
  useAddToWishlistMutation,
  useAddToReadingListMutation,
  useMarkAsFinishedMutation,
} = userApi;

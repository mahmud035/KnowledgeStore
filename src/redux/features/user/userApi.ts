import { api } from '../../api/apiSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;

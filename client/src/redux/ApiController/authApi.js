import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../features/authSlice";

const USER_API = `${import.meta.env.VITE_BASE_URL || "http://localhost:5000"}/api/auth/`;


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "signup",
        method: "POST",
        body: inputData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (inputData) => ({
        url: "verify-email",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    forgotPasswordCode: builder.mutation({
      query: (otp) => ({
        url: "password-code-verification",
        method: "POST",
        body: { otp },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),

    checkAuth: builder.query({
      query: () => ({
        url: "check-auth",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useForgotPasswordCodeMutation,   // <-- Add this here
  useResetPasswordMutation,
  useCheckAuthQuery,
} = authApi;

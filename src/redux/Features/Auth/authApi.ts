import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    verifyOtp: builder.mutation({
      query: (verifyOtpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: verifyOtpData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resendOtp: builder.mutation({
      query: (OtpData) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: OtpData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resendForgetPasswordOtp: builder.mutation({
      query: (OtpData) => ({
        url: "/auth/resend-forgot-password-otp",
        method: "POST",
        body: OtpData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    verifyResetPasswordOtp: builder.mutation({
      query: (verifyOtpData) => ({
        url: "/auth/verify-reset-password-otp",
        method: "POST",
        body: verifyOtpData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResendForgetPasswordOtpMutation,
  useVerifyResetPasswordOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

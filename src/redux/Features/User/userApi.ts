import { baseApi } from "../../Api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: `/user/stats`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    deleteCouponCode: builder.mutation({
      query: (id) => ({
        url: `/coupon-code/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["couponCode"],
    }),

    validateCouponCode: builder.mutation({
      query: (data) => ({
        url: `/coupon-code/validate`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["couponCode"],
    }),
  }),
});

export const { useGetStatsQuery, useUpdateProfileMutation, useDeleteCouponCodeMutation, useValidateCouponCodeMutation } = userApi;

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

    addCouponCode: builder.mutation({
      query: (data) => ({
        url: "/coupon-code/add",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["couponCode"],
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

export const { useGetStatsQuery, useAddCouponCodeMutation, useDeleteCouponCodeMutation, useValidateCouponCodeMutation } = userApi;

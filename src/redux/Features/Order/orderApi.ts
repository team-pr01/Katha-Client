import { baseApi } from "../../Api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCouponCodes: builder.query({
      query: ({ keyword, page }: { keyword?: string; page?: number }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());

        return {
          url: `/coupon-code${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["couponCode"],
    }),
    
    
    checkout: builder.mutation({
      query: (data) => ({
        url: "/order/checkout",
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

export const { useGetAllCouponCodesQuery, useCheckoutMutation, useDeleteCouponCodeMutation, useValidateCouponCodeMutation } = orderApi;

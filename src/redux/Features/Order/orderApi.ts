import { baseApi } from "../../Api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getRazorpayKey: builder.query({
      query: () => ({
        url: "/get-key",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllOrders: builder.query({
      query: ({ keyword, orderStatus, page }: { keyword?: string; orderStatus?: string; page?: number }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (orderStatus) {
          orderStatus === "all" ? params.append("orderStatus", "") : params.append("orderStatus", orderStatus);
        }
        if (page) params.append("page", page.toString());

        return {
          url: `/order/my-orders${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["orders"],
    }),


    checkout: builder.mutation({
      query: (data) => ({
        url: "/order/checkout",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["orders"],
    }),

    verifyPayment: builder.mutation({
      query: ({id, data}) => ({
        url: `/order/verify-payment/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetRazorpayKeyQuery, useGetAllOrdersQuery, useCheckoutMutation, useVerifyPaymentMutation } = orderApi;

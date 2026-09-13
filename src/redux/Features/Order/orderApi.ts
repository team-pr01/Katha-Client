import { baseApi } from "../../Api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: ["couponCode"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useCheckoutMutation } = orderApi;

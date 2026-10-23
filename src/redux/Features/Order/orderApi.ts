import { baseApi } from "../../Api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersForAdmin: builder.query<
  any,
  {
    keyword?: string;
    orderStatus?: string;
    paymentStatus?: string;
    skip?: number;
    limit?: number;
    page?: number;        // 👈 Added page
  }
>({
  query: (filters) => {
    const params = new URLSearchParams();

    // Keyword search
    if (filters.keyword) params.append("keyword", filters.keyword);

    // Pagination
    if (typeof filters.skip === "number") {
      params.append("skip", String(filters.skip));
    }
    if (typeof filters.limit === "number") {
      params.append("limit", String(filters.limit));
    }
    if (typeof filters.page === "number") {
      params.append("page", String(filters.page));
    }

    // Order Status (Only append if it's not "all")
    if (filters.orderStatus && filters.orderStatus !== "all") {
      params.append("orderStatus", filters.orderStatus);
    }

    // Payment Status (Only append if it's not "all")
    if (filters.paymentStatus && filters.paymentStatus !== "all") {
      params.append("paymentStatus", filters.paymentStatus);
    }

    return {
      url: `/order?${params.toString()}`,
      method: "GET",
      credentials: "include",
    };
  },
  providesTags: ["orders"],
}),

    getRazorpayKey: builder.query({
      query: () => ({
        url: "/get-key",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    getAllOrders: builder.query({
      query: ({
        keyword,
        orderStatus,   // 👈 change from `status` to `orderStatus`
        limit,
        page,
        skip
      }: {
        keyword?: string;
        orderStatus?: string;   // 👈 change this
        limit?: number;
        page?: number;
        skip?: number;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);

        // ✅ Only append if it's a real status (not "all" and not empty)
        if (orderStatus && orderStatus !== "all") {
          params.append("orderStatus", orderStatus);
        }

        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/order/my-orders${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["orders"],
    }),

    getSingleORderBySlug: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
        credentials: "include",
      }),
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
      query: ({ id, data }) => ({
        url: `/order/verify-payment/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/status/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetAllOrdersForAdminQuery, useGetRazorpayKeyQuery, useGetAllOrdersQuery, useGetSingleORderBySlugQuery, useCheckoutMutation, useVerifyPaymentMutation, useUpdateOrderStatusMutation } = orderApi;

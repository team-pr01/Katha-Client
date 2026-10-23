import { baseApi } from "../../Api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersForAdmin: builder.query<
      any,
      {
        keyword?: string;
        status?: string;
        skip?: number;
        limit?: number;
      }
    >({
      query: (filters) => {
        const params = new URLSearchParams();

        // Keyword search
        if (filters.keyword) params.append("keyword", filters.keyword);

        // Pagination
        if (filters.skip !== undefined && filters.skip !== null) {
          params.append("skip", String(filters.skip));
        }
        if (filters.limit !== undefined && filters.limit !== null) {
          params.append("limit", String(filters.limit));
        }

        if (filters.status) {
          filters.status === "all" ? params.append("status", "") : params.append("status", filters.status);
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

import { baseApi } from "../../Api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddress: builder.query({
      query: () => {
        return {
          url: `/addresses/my`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["address"],
    }),

    addAddress: builder.mutation({
      query: (data) => ({
        url: "/addresses/add",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),

    updateAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses/update`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),

    deleteAddress: builder.mutation({
      query: () => ({
        url: `/addresses/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["address"],
    }),
  }),
});

export const { useGetMyAddressQuery, useAddAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } = addressApi;

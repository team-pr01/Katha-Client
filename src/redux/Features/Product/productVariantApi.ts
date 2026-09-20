import { baseApi } from "../../Api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllVariantsByProductId: builder.query({
      query: (id) => ({
        url: `/variant/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productVariant", "product"],
    }),

    updateVariant: builder.mutation({
      query: ({ productId, variantId, data }) => ({
        url: `/variant/update/${productId}/${variantId}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["productVariant", "product"],
    }),

    deleteVariant: builder.mutation({
      query: ({ productId, variantId }) => ({
        url: `/variant/delete/${productId}/${variantId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["productVariant", "product"],
    }),
  }),
});

export const {
  useGetAllVariantsByProductIdQuery,
  useUpdateVariantMutation,
  useDeleteVariantMutation
} = productApi;

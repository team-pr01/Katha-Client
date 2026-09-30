import { baseApi } from "../../Api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllVariantsByProductId: builder.query({
      query: (id) => ({
        url: `/variant/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productVariant", "product"],
    }),

    addProductVariant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/variant/add/${id}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["productVariant", "product"],
    }),

    updateProductVariant: builder.mutation({
      query: ({ productId, variantId, data }) => ({
        url: `/variant/update/${productId}/${variantId}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["productVariant", "product"],
    }),

    deleteProductVariant: builder.mutation({
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
  useAddProductVariantMutation,
  useUpdateProductVariantMutation,
  useDeleteProductVariantMutation
} = productApi;

import { baseApi } from "../../Api/baseApi";

const materialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMaterials: builder.query<
      any,
      {
        keyword?: string;
        category?: string[];
        subCategory?: string[];
        skip?: number;
        limit?: number;
      }
    >({
      query: (filters) => {
        const params = new URLSearchParams();

        // Keyword search
        if (filters.keyword) params.append("keyword", filters.keyword);

        // Array filters - join with comma
        if (filters.category && filters.category.length > 0) {
          params.append("category", filters.category.join(","));
        }
        if (filters.subCategory && filters.subCategory.length > 0) {
          params.append("subCategory", filters.subCategory.join(","));
        }

        // Pagination
        if (filters.skip !== undefined && filters.skip !== null) {
          params.append("skip", String(filters.skip));
        }
        if (filters.limit !== undefined && filters.limit !== null) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: `/materials?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["materials"],
    }),

    addMaterial: builder.mutation({
      query: (data) => ({
        url: `/materials/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    updateMaterial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/materials/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/materials/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    addVariant: builder.mutation({
      query: ({id, data}) => ({
        url: `/materials/${id}/variant/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    updateVariant: builder.mutation({
      query: ({id, variantIndex, data}) => ({
        url: `/materials/${id}//variant/update/${variantIndex}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

     deleteVariant: builder.mutation({
      query: ({id, variantIndex}) => ({
        url: `/materials/${id}/variant/delete/${variantIndex}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),
  }),
});

export const {
  useGetAllMaterialsQuery,
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation
} = materialApi;

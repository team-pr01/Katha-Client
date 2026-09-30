import { baseApi } from "../../Api/baseApi";

const materialCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMaterialCategories: builder.query<
      any,
      {
        keyword?: string;
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

        return {
          url: `/material-category?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["materials"],
    }),

    addMaterialCategory: builder.mutation({
      query: (data) => ({
        url: `/material-category/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    updateMaterialCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/material-category/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),

    deleteMaterialCategory: builder.mutation({
      query: (id) => ({
        url: `/material-category/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["materials"],
    }),
  }),
});

export const {
  useGetAllMaterialCategoriesQuery,
  useAddMaterialCategoryMutation,
  useUpdateMaterialCategoryMutation,
  useDeleteMaterialCategoryMutation,
} = materialCategoryApi;

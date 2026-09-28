import { baseApi } from "../../Api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({
        limit,
        page,
        skip,
        keyword
      }: {
        limit?: number;
        page?: number;
        skip?: number;
        keyword?: string
      } = {}) => {
        const params = new URLSearchParams();

        // Keyword search
        if (keyword) params.append("keyword", keyword);
        // Handle limit
        if (typeof limit === "number") params.append("limit", limit.toString());

        // Handle page
        if (typeof page === "number") params.append("page", page.toString());

        // Handle skip
        if (typeof skip === "number") params.append("skip", skip.toString());
        return {
          url: `/category?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: `/category/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

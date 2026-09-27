import { baseApi } from "../../Api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({
        limit,
        page,
        skip
      }: {
        limit?: number;
        page?: number;
        skip?: number;
      } = {}) => {
        const params = new URLSearchParams();

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

import { baseApi } from "../../Api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        category,
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        category?: string;
      } = {}) => {
        const params = new URLSearchParams();

        // Handle keyword - skip if "All"
        if (keyword && keyword !== "All") {
          params.append("keyword", keyword);
        }

        // Handle limit
        if (typeof limit === "number") params.append("limit", limit.toString());

        // Handle page
        if (typeof page === "number") params.append("page", page.toString());

        // Handle skip
        if (typeof skip === "number") params.append("skip", skip.toString());

        // Handle category - skip if "All" or empty
        if (category && category !== "All") {
          params.append("category", category);
        }

        return {
          url: `/blog?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["blog"],
    }),

    getSingleBlogBySlug: builder.query({
      query: (id) => ({
        url: `/blog/slug/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogBySlugQuery,
} = blogApi;

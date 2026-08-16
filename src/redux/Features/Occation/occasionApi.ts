import { baseApi } from "../../Api/baseApi";

const occasionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOccasions: builder.query({
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
          url: `/occasion?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["occasion"],
    }),

    getSingleBlogBySlug: builder.query({
      query: (id) => ({
        url: `/blog/slug/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["occasion"],
    }),
  }),
});

export const {
  useGetAllOccasionsQuery,
  useGetSingleBlogBySlugQuery,
} = occasionApi;

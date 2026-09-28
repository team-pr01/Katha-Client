import { baseApi } from "../../Api/baseApi";

const occasionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOccasions: builder.query({
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
          url: `/occasion?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["occasion"],
    }),

     addOccasion: builder.mutation({
      query: (data) => ({
        url: `/occasion/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["occasion"],
    }),

    updateOccasion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/occasion/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["occasion"],
    }),

    deleteOccasion: builder.mutation({
      query: (id) => ({
        url: `/occasion/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["occasion"],
    }),
  }),
});

export const {
  useGetAllOccasionsQuery,
  useAddOccasionMutation,
  useUpdateOccasionMutation,
  useDeleteOccasionMutation
} = occasionApi;

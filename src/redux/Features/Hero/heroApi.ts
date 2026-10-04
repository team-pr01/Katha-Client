import { baseApi } from "../../Api/baseApi";

const heroApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveHeroes: builder.query({
      query: () => {
        return {
          url: `/hero/active`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["hero"],
    }),

    getAllHeroes: builder.query({
      query: () => {
        return {
          url: `/hero`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["hero"],
    }),

    addHero: builder.mutation({
      query: (data) => ({
        url: `/hero/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["hero"],
    }),

    updateHero: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hero/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["hero"],
    }),

    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/hero/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["hero"],
    }),
  }),
});

export const {
  useGetActiveHeroesQuery,
  useGetAllHeroesQuery,
  useAddHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi;

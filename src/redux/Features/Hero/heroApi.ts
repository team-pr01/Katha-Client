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
  }),
});

export const {
  useGetActiveHeroesQuery,
} = heroApi;

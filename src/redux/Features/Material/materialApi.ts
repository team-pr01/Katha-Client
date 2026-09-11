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

    // getSingleProductBySlug: builder.query({
    //   query: (id) => ({
    //     url: `/product/slug/${id}`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["product"],
    // }),
  }),
});

export const {
  useGetAllMaterialsQuery,
} = materialApi;

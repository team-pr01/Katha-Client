import { baseApi } from "../../Api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


   getAllProducts: builder.query<
      any,
      {
        keyword?: string;
        category?: string[];
        subCategory?: string[];
        occasionNames?: string[];
        subOccasionNames?: string[];
        material?: string[];
        colors?: string[];
        minPrice?: number;
        maxPrice?: number;
        minRating?: number;
        inStock?: boolean;
        isFeatured?: boolean;
        sortBy?: string;
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
        if (filters.occasionNames && filters.occasionNames.length > 0) {
          params.append("occasionNames", filters.occasionNames.join(","));
        }
        if (filters.subOccasionNames && filters.subOccasionNames.length > 0) {
          params.append("subOccasionNames", filters.subOccasionNames.join(","));
        }
        if (filters.material && filters.material.length > 0) {
          params.append("material", filters.material.join(","));
        }
        if (filters.colors && filters.colors.length > 0) {
          params.append("colors", filters.colors.join(","));
        }

        // Price range
        if (filters.minPrice !== undefined && filters.minPrice !== null) {
          params.append("minPrice", String(filters.minPrice));
        }
        if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
          params.append("maxPrice", String(filters.maxPrice));
        }

        // Rating
        if (filters.minRating !== undefined && filters.minRating !== null) {
          params.append("minRating", String(filters.minRating));
        }

        // Boolean filters
        if (filters.inStock !== undefined && filters.inStock !== null) {
          params.append("inStock", String(filters.inStock));
        }
        if (filters.isFeatured !== undefined && filters.isFeatured !== null) {
          params.append("isFeatured", String(filters.isFeatured));
        }

        // Sorting
        if (filters.sortBy) {
          params.append("sortBy", filters.sortBy);
        }

        // Pagination
        if (filters.skip !== undefined && filters.skip !== null) {
          params.append("skip", String(filters.skip));
        }
        if (filters.limit !== undefined && filters.limit !== null) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: `/product?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProductBySlug: builder.query({
      query: (id) => ({
        url: `/product/slug/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductBySlugQuery,
} = productApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendBaseUrl = "http://localhost:5000";
// export const backendBaseUrl = "https://prtech-solutions-server.onrender.com";

const baseQuery = fetchBaseQuery({
  baseUrl: `${backendBaseUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [
    "occasion",
    "scheduledCalls",
  ],
  endpoints: () => ({}),
});
import { baseApi } from "../../Api/baseApi";

const trackOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        trackOrder: builder.mutation({
            query: (data) => ({
                url: `/order-tracking`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["orders"],
        }),
    }),
});

export const { useTrackOrderMutation } = trackOrderApi;

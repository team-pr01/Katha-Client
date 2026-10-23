import { baseApi } from "../../Api/baseApi";

export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Calculate rates during checkout
    calculateRates: builder.mutation({
      query: (payload) => ({
        url: "/shipping/calculate-rates",
        method: "POST",
        body: payload,
      }),
    }),
    // Track shipment
    trackShipment: builder.query({
      query: (awbNumber) => ({
        url: `/shipping/track/${awbNumber}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useCalculateRatesMutation, 
  useLazyTrackShipmentQuery 
} = shippingApi;
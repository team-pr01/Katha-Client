/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../Api/baseApi";

const scheduleCallApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    scheduleCall: builder.mutation<any, any>({
      query: (data) => ({
        url: `/scheduled-call/schedule`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["scheduledCalls"],
    }),
  }),
});

export const {
  useScheduleCallMutation
} = scheduleCallApi;

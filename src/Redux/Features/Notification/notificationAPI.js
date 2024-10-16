import { apiSlice } from "../API/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: "/api/notification/get-notifications",
      }),
      providesTags: ["decline-follow", "accept-follower"],
    }),
    postNotification: builder.mutation({
      query: (data) => ({
        url: "/api/notification/post-notifications",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetNotificationQuery, usePostNotificationMutation } =
  notificationApi;

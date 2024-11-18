import { apiSlice } from "../../API/apiSlice";

const chatRightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/api/message/send`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["c-message"],
    }),
    getMessage: builder.query({
      query: (id) => ({
        url: `/api/message/get-message/${id}`,
      }),
      providesTags: ["c-message"],
    }),
    getSingleUserForChat: builder.query({
      query: (id) => ({
        url: `/api/message/get-singleuser-for-chat/${id}`,
      }),
    }),
  }),
});
export const {
  useSendMessageMutation,
  useGetMessageQuery,
  useGetSingleUserForChatQuery,
} = chatRightApi;

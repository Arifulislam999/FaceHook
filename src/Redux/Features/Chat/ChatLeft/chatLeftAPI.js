import { apiSlice } from "../../API/apiSlice";

const chatLeftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowerChatList: builder.query({
      query: (id) => ({
        url: `/api/message/chat-list?id=${id}`,
      }),
      providesTags: [
        "chat-user",
        "logout-chat",
        "accept-follower",
        "c-message",
      ],
    }),
  }),
});
export const { useGetAllFollowerChatListQuery } = chatLeftApi;

import { apiSlice } from "../../API/apiSlice";

const chatLeftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowerChatList: builder.query({
      query: () => ({
        url: "/api/message/chat-list",
      }),
      providesTags: ["chat-user", "logout-chat"],
    }),
  }),
});
export const { useGetAllFollowerChatListQuery } = chatLeftApi;

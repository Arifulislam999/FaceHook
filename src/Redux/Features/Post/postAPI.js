import { apiSlice } from "../API/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userPost: builder.mutation({
      query: (data) => ({
        url: "/api/post/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user-post"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: "/api/post/all-post",
      }),
      providesTags: [
        "user-post",
        "comment-post",
        "followers",
        "like",
        "update-image",
      ],
    }),
    commentPost: builder.mutation({
      query: ({ id, text, userName, userImg }) => ({
        url: `/api/post/comment-post`,
        method: "POST",
        body: { id, text, userName, userImg },
      }),
      invalidatesTags: ["comment-post"],
    }),
    postLike: builder.mutation({
      query: (data) => ({
        url: "/api/post/like",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["like"],
    }),
  }),
});
export const {
  useUserPostMutation,
  useGetAllPostQuery,
  useCommentPostMutation,
  usePostLikeMutation,
} = postApi;

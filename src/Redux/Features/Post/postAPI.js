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
        "edit",
        "delete-post",
        "decline-follow",
        "accept-follower",
      ],
    }),
    commentPost: builder.mutation({
      query: ({ id, text, userName, userImg }) => ({
        url: `/api/post/comment-post`,
        method: "POST",
        body: { id, text, userName, userImg },
      }),
      invalidatesTags: ["comment-post", "comment-modal-post"],
    }),
    postLike: builder.mutation({
      query: (data) => ({
        url: "/api/post/like",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["like"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // like optimistic cache update start

        const optimisticLikeUpdate = dispatch(
          apiSlice.util.updateQueryData("getAllPost", undefined, (draft) => {
            const post = draft?.data.find((p) => p._id == arg.data.id);
            const alreadyLike = post.likes.some(
              (like) => like.likeUserId == arg.data.loginUserId
            );
            if (alreadyLike) {
              post.likes.pop(arg.data.loginUserId);
            } else {
              post.likes.push(arg.data.loginUserId);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          optimisticLikeUpdate.undo();
        }
        // like optimistic cache update end
      },
    }),
    userFollower: builder.mutation({
      query: (data) => ({
        url: "/api/user/followers",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["followers", "chat-user"],
    }),
    userFollowDecline: builder.mutation({
      query: (data) => ({
        url: "/api/user/follower-decline",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["decline-follow"],
    }),
    userFollowAccept: builder.mutation({
      query: (data) => ({
        url: "/api/user/follow-accept",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["accept-follower"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/api/post/single-post/${id}`,
      }),
      providesTags: ["comment-modal-post", "like"],
    }),
    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/post/update-post/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["edit"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/post/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-post"],
    }),
  }),
});
export const {
  useUserPostMutation,
  useGetAllPostQuery,
  useCommentPostMutation,
  usePostLikeMutation,
  useUserFollowerMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUserFollowDeclineMutation,
  useUserFollowAcceptMutation,
} = postApi;

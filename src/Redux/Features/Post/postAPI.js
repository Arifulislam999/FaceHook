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
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   // like optimistic cache update start

      //   const optimisticLikeUpdate = dispatch(
      //     apiSlice.util.updateQueryData("getAllPost", undefined, (draft) => {
      //       const post = draft?.data.find((p) => p._id == arg.id);
      //       // post.likes.pop(arg.data);
      //       post.likes.includes({});
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     optimisticLikeUpdate.undo();
      //   }
      //   // like optimistic cache update end
      // },
    }),
  }),
});
export const {
  useUserPostMutation,
  useGetAllPostQuery,
  useCommentPostMutation,
  usePostLikeMutation,
} = postApi;

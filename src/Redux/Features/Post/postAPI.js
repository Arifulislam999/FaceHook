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
      providesTags: ["user-post"],
    }),
  }),
});
export const { useUserPostMutation, useGetAllPostQuery } = postApi;

import { apiSlice } from "../API/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegistation: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["logout-chat"],
    }),
    userLoginStatus: builder.query({
      query: () => ({
        url: "/api/user/loggedin",
      }),
    }),
    userLogOut: builder.query({
      query: () => ({
        url: "/api/user/logout",
      }),
    }),
    getSingleUser: builder.query({
      query: (data) => ({
        url: `/api/user/single-user/${data}`,
      }),
      providesTags: [
        "update",
        "update-image",
        "comment-post",
        "followers",
        "like",
        "edit",
        "delete-post",
      ],
    }),
  }),
});
export const {
  useUserRegistationMutation,
  useUserLoginMutation,
  useUserLoginStatusQuery,
  useUserLogOutQuery,
  useGetSingleUserQuery,
} = authApi;

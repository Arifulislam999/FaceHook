import { apiSlice } from "../API/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBio: builder.mutation({
      query: (data) => ({
        url: "/api/user/updatebio",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/api/user/upload-image",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update-image"],
    }),
    userFollower: builder.mutation({
      query: (data) => ({
        url: "/api/user/followers",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["followers"],
    }),
    userResetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    userConfirmPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/confirm-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const {
  useUpdateBioMutation,
  useUploadImageMutation,
  useUserFollowerMutation,
  useUserResetPasswordMutation,
  useUserConfirmPasswordMutation,
} = userApi;

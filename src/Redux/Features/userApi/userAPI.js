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
  }),
});
export const { useUpdateBioMutation, useUploadImageMutation } = userApi;

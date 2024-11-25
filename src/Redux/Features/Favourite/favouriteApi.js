import { apiSlice } from "../API/apiSlice";

const favouriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFavourite: builder.mutation({
      query: (data) => ({
        url: `/api/favourite/add-favourite-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addFavourite"],
    }),
    getFavourite: builder.query({
      query: (id) => ({
        url: `/api/favourite/get-favourite/${id}`,
      }),
      providesTags: ["addFavourite"],
    }),
    getFavourites: builder.query({
      query: () => ({
        url: `/api/favourite/get-favourites`,
      }),
      providesTags: ["addFavourite"],
    }),
  }),
});

export const {
  useAddFavouriteMutation,
  useGetFavouriteQuery,
  useGetFavouritesQuery,
} = favouriteApi;

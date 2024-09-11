import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  follow: false,
};

export const followerSlice = createSlice({
  name: "FollowerApi",
  initialState,
  reducers: {
    isFollow: (state, action) => {
      console.log(action.payload);
      state.follow = action.payload;
    },
  },
});
export const { isFollow } = followerSlice.actions;
export default followerSlice.reducer;

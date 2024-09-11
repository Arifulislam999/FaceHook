import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  windowWidth: 640,
};

export const tokenSlice = createSlice({
  name: "TokenApi",
  initialState,
  reducers: {
    existTokenYesOrNo: (state, action) => {
      state.token = action.payload || null;
    },
    getWindoSize: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});
export const { existTokenYesOrNo, getWindoSize } = tokenSlice.actions;
export default tokenSlice.reducer;

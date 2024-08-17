import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "TokenApi",
  initialState,
  reducers: {
    existTokenYesOrNo: (state, action) => {
      state.token = action.payload || null;
    },
  },
});
export const { existTokenYesOrNo } = tokenSlice.actions;
export default tokenSlice.reducer;

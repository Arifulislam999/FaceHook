import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatActionValue: "active",
};

export const chatLeftSlice = createSlice({
  name: "chatLeftApi",
  initialState,
  reducers: {
    chatActionLeft: (state, action) => {
      state.chatActionValue = action.payload;
    },
  },
});
export const { chatActionLeft } = chatLeftSlice.actions;
export default chatLeftSlice.reducer;

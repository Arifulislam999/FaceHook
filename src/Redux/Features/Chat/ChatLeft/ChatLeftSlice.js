import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatActionValue: "active",
  searchText: "",
};

export const chatLeftSlice = createSlice({
  name: "chatLeftApi",
  initialState,
  reducers: {
    chatActionLeft: (state, action) => {
      state.chatActionValue = action.payload;
    },
    userSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});
export const { chatActionLeft, userSearchText } = chatLeftSlice.actions;
export default chatLeftSlice.reducer;

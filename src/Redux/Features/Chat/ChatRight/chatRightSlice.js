import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatUser: [],
};

export const chatRightSlice = createSlice({
  name: "chatRightApi",
  initialState,
  reducers: {
    selectChatUser: (state, action) => {
      if (state.chatUser.length > 0) {
        state.chatUser = [];
        state.chatUser.push(action.payload);
      } else {
        state.chatUser.push(action.payload);
      }
    },
  },
});
export const { selectChatUser } = chatRightSlice.actions;
export default chatRightSlice.reducer;

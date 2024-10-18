import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentText: {
    text: null,
    isPending: false,
    postId: null,
  },
};

export const commentSlice = createSlice({
  name: "commentApi",
  initialState,
  reducers: {
    commentPendingOrSuccess: (state, action) => {
      state.commentText.text = action.payload.text;
      state.commentText.isPending = action.payload.action;
      state.commentText.postId = action.payload.postId;
    },
  },
});
export const { commentPendingOrSuccess } = commentSlice.actions;
export default commentSlice.reducer;

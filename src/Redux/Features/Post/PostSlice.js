import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mindPostModalStatus: false,
  inputBoxShow: {
    commentId: null,
    boxStatus: false,
  },
  inputText: false,
  editModal: false,
  allComment: false,
  modalPost: null,
};
export const socialPost = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    mindPostActive: (state) => {
      state.mindPostModalStatus = true;
    },
    mindPostInActive: (state) => {
      state.mindPostModalStatus = false;
    },
    commentShowActive: (state, action) => {
      state.inputBoxShow.boxStatus = true;
      state.inputBoxShow.commentId = action.payload;
    },
    commentShowInActive: (state) => {
      state.inputBoxShow.boxStatus = false;
    },
    allCommentShowActive: (state) => {
      state.allComment = true;
    },
    allCommentShowInActive: (state) => {
      state.allComment = false;
    },
    inputColorSend: (state, action) => {
      state.inputText = action.payload;
    },
    editModalActive: (state) => {
      state.editModal = true;
    },
    editModalInActive: (state) => {
      state.editModal = false;
    },
    singleModalPost: (state, action) => {
      state.modalPost = action.payload;
    },
  },
});

export const {
  mindPostActive,
  mindPostInActive,
  commentShowActive,
  commentShowInActive,
  inputColorSend,
  editModalActive,
  editModalInActive,
  allCommentShowActive,
  allCommentShowInActive,
  singleModalPost,
} = socialPost.actions;
export default socialPost.reducer;

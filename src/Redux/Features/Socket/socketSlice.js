import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUserBySocket: null,
};

export const socketSlice = createSlice({
  name: "SocketApi",
  initialState,
  reducers: {
    socketActiveLoginUser: (state, action) => {
      state.loginUserBySocket = action.payload;
    },
  },
});
export const { socketActiveLoginUser } = socketSlice.actions;
export default socketSlice.reducer;

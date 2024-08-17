import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "UserApi",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload || null;
    },
    loginUserRemove: (state) => {
      state.user = null;
    },
  },
});
export const { loginUser, loginUserRemove } = userSlice.actions;
export default userSlice.reducer;

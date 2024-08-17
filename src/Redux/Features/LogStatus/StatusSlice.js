import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const statusSlice = createSlice({
  name: "StatusApi",
  initialState,
  reducers: {
    loginStatusActive: (state) => {
      state.status = true;
    },
    loginStatusInActive: (state) => {
      state.status = false;
    },
  },
});
export const { loginStatusActive, loginStatusInActive } = statusSlice.actions;
export default statusSlice.reducer;

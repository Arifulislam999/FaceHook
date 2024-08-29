import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};
const notificationSlice = createSlice({
  name: "NotificationSlice",
  initialState,
  reducers: {
    allNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
export const { allNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

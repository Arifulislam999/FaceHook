import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./Features/API/apiSlice";
import socialPostReducer from "./Features/Post/PostSlice";
import tokenReducer from "./Features/Token/TokenSlice";
import loginReducer from "./Features/LogStatus/StatusSlice";
import userReducer from "./Features/userApi/UserSlice";
// import commentStatusReducer from "./Features/Comment/CommentSlice";
import notificationReducer from "./Features/Notification/notificationSliceStatus";
import followerReducer from "./Features/Follwers/FollowerSlice";
import chatLeftReducer from "./Features/Chat/ChatLeft/ChatLeftSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    mindStatus: socialPostReducer,
    tokenStatus: tokenReducer,
    loginStatus: loginReducer,
    loginUser: userReducer,
    // commentStatus: commentStatusReducer,
    getNotification: notificationReducer,
    followStatus: followerReducer,
    chatLeft: chatLeftReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

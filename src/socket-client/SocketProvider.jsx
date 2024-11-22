/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActiveLoginUser } from "../Redux/Features/Socket/socketSlice";
import socket from "./socket-client.js";

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginUser);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (user?.firstName) {
      // Join as a user with a specific ID
      const userId = user?._id; // Replace with the logged-in user's ID
      socket.emit("user:join", userId);
      // Listen for updates to the active users list
      socket.on("activeUsers:update", (users) => {
        setActiveUsers(users); // Update the React state
      });
      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    dispatch(socketActiveLoginUser(activeUsers));
  }, [activeUsers, dispatch]);

  return <div>{children}</div>;
};

export default SocketProvider;

/* eslint-disable react/prop-types */
import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeIn12HourFormat } from "../utils/time";
import InActiveDot from "./InActiveDot";
import { useEffect, useState } from "react";
import socket from "../../socket-client/socket-client";

const ChatUserLeft = ({ chatList }) => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  const { loginUserBySocket } = useSelector((state) => state.socketLoginUser);
  const { user, message } = chatList || {};
  const { firstName, lastName, profile, _id } = user || {};
  const { user: loginUser } = useSelector((state) => state.loginUser);
  const [recentMessage, setRecentMessage] = useState();

  // console.log(loginUserBySocket);
  useEffect(() => {
    // Register user to Socket.IO on login
    if (loginUser?._id) {
      socket.emit("register", { userId: loginUser?._id });
    }
    // Remove existing listener to avoid duplicates
    socket.off("receive_message_left");

    // listen the user on socket connect
    socket.on("receive_message_left", (newMessage) => {
      if (
        (newMessage?.receiverId == user?._id &&
          newMessage?.senderId == loginUser?._id) ||
        (newMessage?.receiverId == loginUser?._id &&
          newMessage?.senderId == user?._id)
      ) {
        // console.log(newMessage);
        // message[0].message = newMessage.message;
        // console.log(message[0]);
        setRecentMessage(newMessage);
      }
    });
    // Cleanup on component unmount
    return () => {
      socket.off("receive_message_left");
    };
  }, [loginUser?._id, message, user?._id]);

  return (
    <Link
      to={`${
        windowWidth > 640
          ? `/chat?id=${_id}&name=${firstName} ${lastName}`
          : `/chat/${_id}`
      }`}
    >
      <div className="flex flex-grow  justify-between  my-1.5 rounded-sm  cursor-pointer  shadow-lg ">
        <div>
          <div className="flex">
            <img
              className="w-10 h-10 border border-r-indigo-300 rounded-full"
              src={profile || Me}
              alt={firstName}
            />
            <div className="ml-2">
              {loginUserBySocket.includes(_id) ? (
                <ActiveDot />
              ) : (
                <InActiveDot />
              )}
            </div>
            <div>
              <h2 className="text-lg  -mt-0">
                {firstName} {lastName}
              </h2>

              {message === undefined || message.length === 0 ? (
                <>
                  <p className="opacity-50">No message yet.</p>
                </>
              ) : recentMessage?.message ? (
                <p className=" text-[11px]">
                  {recentMessage?.message.length > 35
                    ? `${recentMessage?.message?.slice(0, 35)}....`
                    : recentMessage?.message}
                </p>
              ) : (
                <p className=" text-[11px]">
                  {message[0]?.message.length > 35
                    ? `${message[0]?.message?.slice(0, 35)}....`
                    : message[0]?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {message && message.length > 0 && (
          <div className="ml-2 flex-shrink-0 mt-3">
            <p className="text-[12px] text-gray-400">
              {getTimeIn12HourFormat(message[0].createdAt)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ChatUserLeft;

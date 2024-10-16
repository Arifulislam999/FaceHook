/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Me from "../../assets/images/fakeuser.png";
import ActiveDot from "./ActiveDot";
import { useEffect, useRef } from "react";
import { getTimeIn12HourFormat } from "../utils/time";

const ChatReceiver = ({ messages }) => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  const { chatUser } = useSelector((state) => state.chatRight);
  // const { user } = useSelector((state) => state.loginUser);
  const { createdAt, message } = messages || {};
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="flex items-end z-10 pt-2 ml-3" ref={messageRef}>
      <img
        className="w-8  h-8 border border-r-indigo-300 rounded-full"
        src={chatUser[0]?.profile || Me}
        alt="profile"
      />
      <div className="ml-2">
        <ActiveDot />
      </div>
      <div
        className={`bg-gradient-to-r from-black via-gray-900 to-gray-800  text-white rounded-md xxs:max-w-[210px] xs:max-w-[260px] mxs:max-w-[280px] sm:max-w-sm  px-3  ml-1 ${
          windowWidth < 441 && "max-w-[260px]"
        } `}
      >
        <div className="flex justify-between">
          <h1 className="font-bold ">
            {chatUser[0]?.firstName} {chatUser[0]?.lastName}
          </h1>
          <span className="text-xs text-gray-400 mt-1.5 ml-3">
            {getTimeIn12HourFormat(createdAt)}
          </span>
        </div>
        <p className="pb-1 text-gray-400 overflow-hidden">{message}</p>
      </div>
    </div>
  );
};

export default ChatReceiver;

/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Me from "../../assets/images/fakeuser.png";
import ActiveDot from "./ActiveDot";
import { useEffect, useRef } from "react";
import { getTimeIn12HourFormat } from "../utils/time";

const ChatSender = ({ messages }) => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  const { user } = useSelector((state) => state.loginUser);
  const messageRef = useRef();
  const { createdAt, message } = messages || {};
  useEffect(() => {
    if (messageRef.current) {
      // messageRef.current.scrollIntoView({ behavior: "smooth" });
      messageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="flex justify-end  " ref={messageRef}>
      <div
        className={`bg-blue-900 mt-2 to-gray-800  text-white rounded-md xxs:max-w-[210px] xs:max-w-[260px] mxs:max-w-[280px] sm:max-w-sm  px-3 max-w-sm  ${
          windowWidth < 441 && "max-w-[260px]"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <span className="text-xs text-gray-400 mt-1.5 ml-3">
            {getTimeIn12HourFormat(createdAt)}
          </span>
        </div>
        <p className="pb-1 text-gray-300 overflow-hidden">{message}</p>
      </div>
      <div className="flex items-end ml-3">
        <img
          className="w-8 h-8 border border-r-indigo-300 rounded-full"
          src={user.profile || Me}
          alt="profile"
        />
        <div className="ml-2">
          <ActiveDot />
        </div>
      </div>
    </div>
  );
};

export default ChatSender;

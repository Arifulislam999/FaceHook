/* eslint-disable react/prop-types */
import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeIn12HourFormat } from "../utils/time";
import InActiveDot from "./InActiveDot";
const ChatUserLeft = ({ chatList }) => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  const { loginUserBySocket } = useSelector((state) => state.socketLoginUser);
  const { user, message } = chatList || {};
  const { firstName, lastName, profile, _id } = user || {};

  console.log(loginUserBySocket);

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
                <p>No conversation yet...</p>
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

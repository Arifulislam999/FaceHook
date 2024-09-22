/* eslint-disable react/prop-types */
import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ChatUserLeft = ({ chatList }) => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);

  const { firstName, lastName, profile, _id } = chatList || {};

  return (
    <Link to={`${windowWidth > 640 ? `/chat?id=${_id}` : `/chat/${_id}`}`}>
      <div className="flex flex-grow  justify-between  my-1.5 rounded-sm  cursor-pointer  shadow-lg ">
        <div>
          <div className="flex">
            <img
              className="w-10 h-10 border border-r-indigo-300 rounded-full"
              src={profile || Me}
              alt={firstName}
            />
            <div className="ml-3">
              <ActiveDot />
            </div>
            <div>
              <h2 className="text-lg  -mt-0">
                {firstName} {lastName}
              </h2>
              <p className=" text-[11px]">Hello! Arif.</p>
            </div>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0 mt-3">
          <p className="text-[12px] text-gray-400">Now</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatUserLeft;

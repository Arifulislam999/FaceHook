import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import Bell from "../../assets/icons/bellWhite.svg";
import ChatLeftSearch from "./ChatLeftSearch";
import ChatUserLeft from "./ChatUserLeft";
import { useSelector } from "react-redux";
import FavouriteList from "./FavouriteList";
import ChatAll from "./ChatAll";
import { useGetAllFollowerChatListQuery } from "../../Redux/Features/Chat/ChatLeft/chatLeftAPI";
import { useEffect, useState } from "react";
import Shadaw from "../Loader/Shadaw";
import { Link } from "react-router-dom";
import NoFollowers from "./NoFollowers";

const ChatLeftHead = () => {
  const { chatActionValue } = useSelector((state) => state.chatLeft);
  const { user } = useSelector((state) => state.loginUser);
  const { firstName, lastName, profile, _id } = user || {};

  const {
    data: followerUserList,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useGetAllFollowerChatListQuery();
  const [fUserList, setFUserList] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setFUserList(followerUserList?.data);
    }
  }, [isSuccess, followerUserList]);

  useEffect(() => {
    if (isError) {
      console.log(error?.message);
    }
  }, [isError, error]);

  return (
    <div className="bg-mediumDark">
      <div className="sticky top-0 ">
        {isLoading && <Shadaw />}
        <div className="flex justify-between p-3 bg-mediumDark">
          <div className="flex sticky">
            <Link to={`/profile/${_id}`}>
              <img
                className="w-12 h-12 border border-r-indigo-300 rounded-full"
                src={profile || Me}
                alt={firstName}
              />
            </Link>
            <div className="ml-2">
              <ActiveDot />
            </div>
            <div className="flex flex-col">
              <Link to={`/profile/${_id}`}>
                <span className="mt-1 text-lg ml-1 font-bold">
                  {firstName} {lastName}
                </span>
              </Link>
              <span className="text-[10px] -mt-1 text-gray-400 -pt-3">
                Active Now
              </span>
            </div>
          </div>
          <div className="mt-3">
            <img className="w-6 h-6 cursor-pointer" src={Bell} alt="bell" />
          </div>
        </div>
        <div className="bg-mediumDark  border-b border-[#3F3F3F]">
          <ChatLeftSearch />
        </div>
      </div>

      {fUserList?.length === 0 && <NoFollowers />}

      {chatActionValue === "all" &&
        fUserList?.map((fuser, i) => <ChatAll key={i} chatList={fuser} />)}
      {chatActionValue === "active" && (
        <div className="bg-mediumDark mx-3 flex-grow  ">
          {fUserList?.map((fuser, index) => (
            <ChatUserLeft key={index} chatList={fuser} />
          ))}
        </div>
      )}
      {chatActionValue === "favourite" &&
        fUserList?.map((fuser, i) => (
          <FavouriteList key={i} chatList={fuser} />
        ))}
    </div>
  );
};

export default ChatLeftHead;

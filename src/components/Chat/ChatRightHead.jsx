import Me from "../../assets/images/fakeuser.png";
import Star from "../../assets/icons/WhiteStar.svg";
import ActiveDot from "./ActiveDot";
import MessageInput from "./MessageInput";
import { useLocation, useParams } from "react-router-dom";
import { useGetSingleUserForChatQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Shadaw from "../Loader/Shadaw";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectChatUser } from "../../Redux/Features/Chat/ChatRight/chatRightSlice";

const ChatRightHead = () => {
  const { id: searchId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id") || searchId;

  const [cUser, setCUser] = useState([]);

  const { data: chatUser, isLoading } = useGetSingleUserForChatQuery(id);
  useEffect(() => {
    if (chatUser?.message === "success") {
      setCUser(chatUser?.data);
      dispatch(selectChatUser(chatUser?.data));
    }
  }, [chatUser, dispatch]);

  return (
    <div>
      <div className="flex justify-between p-3  bg-gray-800 border-b border-[#3F3F9F] shadow-xl">
        {isLoading && <Shadaw />}
        <div className="flex sticky">
          <img
            className="w-12 h-12 border border-r-indigo-300 rounded-full"
            src={cUser?.profile || Me}
            alt="picture"
          />
          <div className="ml-2">
            <ActiveDot />
          </div>
          <div className="flex flex-col ml-1 ">
            <span className="mt-1 text-lg font-bold">
              {cUser?.firstName} {cUser?.lastName}
            </span>
            <span className="text-[10px] -mt-1 text-gray-400 -pt-3">
              Online
            </span>
          </div>
        </div>
        <div className="mt-2">
          <img className="w-6 h-6 cursor-pointer" src={Star} alt="bell" />
        </div>
      </div>

      {/* input  */}
      <div className={`fixed bottom-0 md:w-[659px] w-full`}>
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRightHead;

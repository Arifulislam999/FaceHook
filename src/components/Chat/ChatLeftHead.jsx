import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import Bell from "../../assets/icons/bellWhite.svg";
import ChatLeftSearch from "./ChatLeftSearch";
import ChatUserLeft from "./ChatUserLeft";
import { useSelector } from "react-redux";
import FavouriteList from "./FavouriteList";
import ChatAll from "./ChatAll";

const ChatLeftHead = () => {
  const { chatActionValue } = useSelector((state) => state.chatLeft);
  return (
    <div className="bg-mediumDark">
      <div className="sticky top-0 ">
        <div className="flex justify-between p-3 bg-mediumDark">
          <div className="flex sticky">
            <img
              className="w-12 border border-r-indigo-300 rounded-full"
              src={Me}
              alt="picture"
            />
            <div className="ml-2">
              <ActiveDot />
            </div>
            <div className="flex flex-col">
              <span className="mt-1 text-lg ml-1 font-bold">Ariful Islam</span>
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
      {chatActionValue === "active" && (
        <div className="bg-mediumDark mx-3 flex-grow  ">
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
          <ChatUserLeft />
        </div>
      )}
      {chatActionValue === "favourite" && <FavouriteList />}
      {chatActionValue === "all" && <ChatAll />}
    </div>
  );
};

export default ChatLeftHead;

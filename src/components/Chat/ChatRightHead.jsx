import Me from "../../assets/images/fakeuser.png";
import Star from "../../assets/icons/WhiteStar.svg";
import ActiveDot from "./ActiveDot";
import MessageInput from "./MessageInput";
const ChatRightHead = () => {
  return (
    <div>
      <div className="flex justify-between p-3  bg-gray-800 border-b border-[#3F3F9F] shadow-xl">
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
            <span className="mt-1 text-lg  font-bold">Ariful Islam</span>
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
      <div className="fixed bottom-0 md:w-[659px] xxs:w-[320px] xs:w-[376px] mxs:w-[425px]">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRightHead;

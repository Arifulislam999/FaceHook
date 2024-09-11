import { useSelector } from "react-redux";
import Me from "../../assets/images/fakeuser.png";
import ActiveDot from "./ActiveDot";

const ChatReceiver = () => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);

  return (
    <div className="flex items-end z-10 pt-2 ml-3">
      <img
        className="w-8  h-8 border border-r-indigo-300 rounded-full"
        src={Me}
        alt="profile"
      />
      <div className="ml-2">
        <ActiveDot />
      </div>
      <div
        className={`bg-gray-800 text-white rounded-md xxs:max-w-[210px] xs:max-w-[260px] mxs:max-w-[280px] sm:max-w-sm  px-3  ml-1 ${
          windowWidth < 441 && "max-w-[260px]"
        } `}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">Ariful Islam</h1>
          <span className="text-xs text-gray-400 mt-1.5 ml-3">12:12 pm</span>
        </div>
        <p className="pb-1">
          As I am already working on that document... I am already working on
          that document.
        </p>
      </div>
    </div>
  );
};

export default ChatReceiver;

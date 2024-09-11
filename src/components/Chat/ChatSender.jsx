import { useSelector } from "react-redux";
import Me from "../../assets/images/fakeuser.png";
import ActiveDot from "./ActiveDot";

const ChatSender = () => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  return (
    <div className="flex justify-end mt-2 ">
      <div
        className={`bg-gray-900 text-white rounded-md xxs:max-w-[210px] xs:max-w-[260px] mxs:max-w-[280px] sm:max-w-sm  px-3 max-w-sm  ${
          windowWidth < 441 && "max-w-[260px]"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">Ariful Islam</h1>
          <span className="text-xs text-gray-400 mt-1.5 ml-3">12:12 pm</span>
        </div>
        <p className="pb-1">
          As Lorem ipsum dolor, sit amet consectetur adipisicing elit. In,
          incidunt? Lorem ipsum arifaul iaasf Lorem ipsum dolor sit.
        </p>
      </div>
      <div className="flex items-end ml-3">
        <img
          className="w-8 h-8 border border-r-indigo-300 rounded-full"
          src={Me}
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

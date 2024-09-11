import ActiveDot from "./ActiveDot";
import Me from "../../assets/images/fakeuser.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ChatUserLeft = () => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  return (
    <Link to={`${windowWidth > 640 ? "/chat?id=1" : "/chat/1"}`}>
      <div className="flex flex-grow  justify-between  my-1.5 rounded-sm  cursor-pointer  shadow-lg ">
        <div>
          <div className="flex">
            <img
              className="w-10 h-10 border border-r-indigo-300 rounded-full"
              src={Me}
              alt="picture"
            />
            <div className="ml-3">
              <ActiveDot />
            </div>
            <div>
              <h2 className="text-lg  -mt-0">Ariful Islam</h2>
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

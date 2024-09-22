/* eslint-disable react/prop-types */
import Logo from "../../assets/images/logoIcon.png";
import Cookies from "js-cookie";
import "./logoS.css";
import notificationImg from "../../assets/icons/notification.svg";
import home from "../../assets/icons/home.svg";
import chat from "../../assets/icons/chat.svg";
import Logout from "../Logoptions/Logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationToolTip from "../Notifications/NotificationToolTip";

const FixedHeader = ({ positionH }) => {
  const pathname = window.location.pathname;
  let subPath = pathname.slice(0, 5);
  const { user } = useSelector((state) => state.loginUser);
  const { notification } = useSelector((state) => state.getNotification);
  const handlerNotification = () => {
    Cookies.set("Notification", notification?.length, { expires: 365 });
  };

  return (
    <div>
      <nav
        className={`fixed w-full z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4 transition-all duration-300  ease-in-out ${
          positionH > 1000 ? "top-0" : "top-10"
        }`}
      >
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <Link to="/">
            <div className="flex">
              <img
                className="max-w-[100px] rounded-full w-12"
                src={Logo}
                alt="logo"
              />
              <span className="font-bold mt-3 ml-0.5 text-xl logoStyle">
                LinkSy
              </span>
            </div>
          </Link>

          {/* <!-- nav links  --> */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Link to="/" className="btn-primary">
              <img src={home} alt="Home" />
              {pathname === "/" && "Home"}
            </Link>
            <Link to="/notifications">
              <button
                className="btn-primary relative"
                onClick={handlerNotification}
              >
                <NotificationToolTip />
                <img src={notificationImg} alt="Notification" />
                {pathname === "/notifications" && "Notification"}
              </button>
            </Link>
            <Link to="/chat" className="btn-primary">
              <img src={chat} alt="Home" className="w-6" />
              {(pathname === "/chat" || subPath === "/chat") && "Chat"}
            </Link>
            <Logout />

            <Link to={`/profile/${user?._id}`}>
              <button className="flex-center sm:!ml-8 gap-2">
                <span className="hidden sm:block text-lg font-medium lg:text-xl">
                  {user?.firstName}
                </span>
                <img
                  className="rounded-full border w-28 h-28 border-red-300 max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                  src={user?.profile}
                  alt={user?.firstName}
                />
              </button>
            </Link>
          </div>
          {/* <!-- nav links ends --> */}
        </div>
      </nav>
    </div>
  );
};

export default FixedHeader;

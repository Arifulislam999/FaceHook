import logo from "../../assets/images/logo.svg";
import Cookies from "js-cookie";
import notificationImg from "../../assets/icons/notification.svg";
import home from "../../assets/icons/home.svg";
import Logout from "../Logoptions/Logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationToolTip from "../Notifications/NotificationToolTip";
const Header = () => {
  const { user } = useSelector((state) => state.loginUser);
  const { notification } = useSelector((state) => state.getNotification);
  const handlerNotification = () => {
    Cookies.set("Notification", notification?.length);
  };

  return (
    <div>
      <nav className="sticky w-full top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={logo}
              alt="logo"
            />
          </Link>
          {/* <!-- nav links  --> */}

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={home} alt="Home" />
              Home
            </Link>
            <Link to="/notifications">
              <button
                className="icon-btn relative"
                onClick={handlerNotification}
              >
                <NotificationToolTip />
                <img src={notificationImg} alt="Notification" />
              </button>
            </Link>

            <Logout />

            <Link to={`/profile/${user?._id}`}>
              <button className="flex-center !ml-8 gap-3">
                <span className="text-lg font-medium lg:text-xl">
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

export default Header;

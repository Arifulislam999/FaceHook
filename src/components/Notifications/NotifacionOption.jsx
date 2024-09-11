/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { timeDifference } from "../utils/timeDirrerence";
import TimeIcon from "../../assets/icons/time.svg";
import blueFollow from "../../assets/icons/blueFollow.svg";
import commentPic from "../../assets/icons/blueComment.svg";
import blueLike from "../../assets/icons/blueLikeN.svg";
import { Link } from "react-router-dom";

const NotifacionOption = ({ image, name, title, time, reactUserId }) => {
  let decision = null;
  let images = null;

  if (title === "Follow") {
    decision =
      "you to see what you're up to and what do you upload and what pictures and statuses do you give and also wants to connect with you to get regular updates";
    images = blueFollow;
  } else if (title === "Like") {
    decision = "your photo";
    images = blueLike;
  } else {
    decision = "on your post. Check what they said.";
    images = commentPic;
  }
  return (
    <Link to={`/profile/${reactUserId}`}>
      <div className="flex gap-3 sm:gap-4 cursor-pointer hover:bg-mediumDark hover:rounded-md px-2 py-3 items-start">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={image}
            alt="notificationImage"
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-blue-500 rounded-full `}
          />
          {/* Icon (Like/Follow/Comment) */}
          <img
            src={images}
            alt="notificationType"
            className={`absolute w-5 sm:w-6 md:w-7 -right-3 sm:-right-4 top-7 ${
              title === "Like" && "top-6"
            }`}
          />
        </div>

        {/* Notification Text */}
        <div className="flex-1 pl-1 lg:pl-3">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl">
            <span className="font-bold">{name}</span> {title} {decision}, click
            and check {name}'s activities.
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <img className="w-3 sm:w-4 md:w-5" src={TimeIcon} alt="time" />
            <span className="text-xs text-gray-400 sm:text-sm">
              {timeDifference(time)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotifacionOption;

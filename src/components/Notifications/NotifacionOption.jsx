/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { timeDifference } from "../utils/timeDirrerence";
import TimeIcon from "../../assets/icons/time.svg";
import blueFollow from "../../assets/icons/blueFollow.svg";
import commentPic from "../../assets/icons/blueComment.svg";
import blueLike from "../../assets/icons/blueLikeN.svg";
const NotifacionOption = ({ image, name, title, time }) => {
  let decision = null;
  let images = null;
  if (title === "Follow") {
    decision =
      "you to see what you're up to and what do you upload and what pictures and statuses do you give and also wants to connect with you to get regular updates";
    images = blueFollow;
  } else if (title === "Like") {
    decision = "your photo so gave a like";
    images = blueLike;
  } else {
    decision = "has been made. See what you have commented";
    images = commentPic;
  }
  return (
    <div className="flex  gap-1 cursor-pointer hover:bg-mediumDark hover:rounded-md  px-2">
      <div className="relative">
        <div>
          <img
            src={image}
            alt="notificationImage"
            className={`lg:w-10 lg:h-8 w-10 mr-5  border border-blue-500 rounded-full  mt-5 lg:mt-2 h-6  ${
              title === "Follow" && "mr-6 lg:mr-9"
            }`}
          />
        </div>
        <div>
          <img
            src={images}
            alt="notificationImage"
            className={`absolute w-6  -right-4 top-7 ${
              title === "Like" && "lg:-right-1 lg:top-4"
            }`}
          />
        </div>
      </div>
      <div>
        <h2 className="mt-2 px-3 ml-3 text-lg lg:text-xl">
          <span className="font-bold ">{name}</span> {title} {decision}, click
          and check who this person and it's activities.
        </h2>
        <div className="flex items-center gap-1.5 ml-5">
          <img className="w-2.5 lg:w-3" src={TimeIcon} alt="time" />
          <span className="text-[10px]  text-gray-400 lg:text-sm">
            {timeDifference(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotifacionOption;

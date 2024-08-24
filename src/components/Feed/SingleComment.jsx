/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleComment = ({ comment }) => {
  const { user } = useSelector((state) => state.loginUser);
  return (
    <div className="flex items-center gap-3 pt-4">
      <img
        className="max-w-6 w-24 h-24 border border-red-400 max-h-6 rounded-full "
        src={user.profile || comment.userImg}
        alt="avatar2"
      />
      <div>
        <div className="flex gap-1 text-xs lg:text-sm">
          <Link to={`/profile/${comment.commentUserId}`}>
            <span className="font-bold cursor-pointer hover:text-blue-300 duration-100 transition-all hover:opacity-70">
              {comment.userName}:{" "}
            </span>
          </Link>
          <div>
            <span className="overflow-x-hidden">{comment.commentTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

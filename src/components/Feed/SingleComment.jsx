/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const SingleComment = ({ comment }) => {
  return (
    <div className="flex items-center gap-3 pt-4">
      <img
        className="max-w-6 w-24 h-24 border border-red-400 max-h-6 rounded-full"
        src={comment.userImg}
        alt="avatar2"
      />
      <div>
        <div className="flex gap-1 text-xs lg:text-sm">
          <Link to={`/profile/${comment.commentUserId}`}>
            <span className="font-bold cursor-pointer hover:text-blue-300 duration-100 transition-all hover:opacity-70">
              {comment.userName}:{" "}
            </span>
          </Link>
          <span>{comment.commentTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

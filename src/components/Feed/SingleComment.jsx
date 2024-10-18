/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allCommentShowInActive } from "../../Redux/Features/Post/PostSlice";
import { timeDifference } from "../utils/timeDirrerence";

const SingleComment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginUser);
  const { commentText } = useSelector((state) => state.commentStatus);
  const handlerProfile = () => {
    dispatch(allCommentShowInActive());
  };
  return (
    <>
      <div className="flex items-center gap-3 ">
        <img
          className="max-w-6 w-24 h-24 border border-red-400 max-h-6 rounded-full "
          src={comment.userImg}
          alt="avatar2"
        />
        <div>
          <div className="flex gap-1 flex-col text-xs lg:text-sm">
            <div className="bg-deepDark px-4 py-2 rounded-md ">
              <Link
                to={`/profile/${comment.commentUserId}?name=${comment.userName}`}
              >
                <span
                  onClick={handlerProfile}
                  className="font-bold cursor-pointer hover:text-blue-300 duration-100 transition-all hover:opacity-70"
                >
                  {comment.userName}
                </span>
              </Link>
              <div>
                <span className="overflow-x-hidden  ">
                  {comment.commentTitle}
                </span>
              </div>
            </div>
            <div className="text-gray-500 -mt-2 text-end">
              <span className="overflow-x-hidden text-sm ">
                {timeDifference(comment?.time)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {commentText.postId === postId && commentText.isPending && (
        <div className="flex items-center gap-3 pt-1">
          <img
            className="max-w-6 w-24 h-24 border border-red-400 max-h-6 rounded-full "
            src={user.profile}
            alt="avatar2"
          />
          <div>
            <div className="flex gap-1 flex-col text-xs lg:text-sm">
              <div className="bg-deepDark px-4 py-2 rounded-md ">
                <Link to={`/profile/${user._id}?name=${user.firstName}`}>
                  <span
                    onClick={handlerProfile}
                    className="font-bold cursor-pointer hover:text-blue-300 duration-100 transition-all hover:opacity-70"
                  >
                    {user.firstName} {user.lastName}
                  </span>
                </Link>
                <div>
                  <span className="overflow-x-hidden  ">
                    {commentText.text}
                  </span>
                </div>
              </div>
              <div className="text-gray-500 -mt-2 text-end">
                <span className="overflow-x-hidden text-sm ">pending...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleComment;

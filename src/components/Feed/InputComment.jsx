/* eslint-disable react/prop-types */
import avatar from "../../assets/images/avatars/user1.jpeg";
import cross from "../../assets/icons/cross.svg";
import greensend from "../../assets/icons/greenSend.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentShowInActive,
  inputColorSend,
} from "../../Redux/Features/Post/PostSlice";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import { useCommentPostMutation } from "../../Redux/Features/Post/postAPI";
import Toast from "../Toast/Toast";
import { usePostNotificationMutation } from "../../Redux/Features/Notification/notificationAPI";

export const InputComment = ({ id, postCreatorId }) => {
  const dispatch = useDispatch();
  const { inputText, inputBoxShow } = useSelector((state) => state.mindStatus);
  const { user } = useSelector((state) => state.loginUser);
  const [commentPost, { data: responsePostComment, isError, error }] =
    useCommentPostMutation();
  const [postNotification] = usePostNotificationMutation();

  const [text, setText] = useState("");
  const debounceSearch = useDebounce(text);
  const [toastMessage, setTosatMessage] = useState(null);

  useEffect(() => {
    if (debounceSearch.length > 0) {
      dispatch(inputColorSend(true));
    } else {
      dispatch(inputColorSend(false));
    }
  }, [dispatch, debounceSearch]);

  const handlerCommentsSubmit = async () => {
    try {
      if (text.length > 0 && text !== "") {
        dispatch(commentShowInActive());
        setText("");

        const userName = user.firstName + " " + user?.lastName;
        const userImg = user?.profile;
        await commentPost({ id, text, userName, userImg });
        await postNotification({
          data: { postCreatorId: postCreatorId, postId: id, action: "Comment" },
        });
      }
    } catch (error) {
      console.log("error comment submit");
    }
  };
  const handlerCross = () => {
    dispatch(commentShowInActive());
  };

  useEffect(() => {
    setTosatMessage(responsePostComment?.message);
  }, [responsePostComment]);
  useEffect(() => {
    setTosatMessage(error?.data?.message);
  }, [isError, error]);

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} />}
      <div
        className={`flex-center mb-3 gap-2 lg:gap-4 ${
          inputBoxShow.boxStatus && inputBoxShow.commentId === id
            ? " duration-200 translate-y-0 opacity-100 "
            : "opacity-0 h-0  duration-200  -translate-y-5 pointer-events-none"
        }`}
      >
        <Link to={`/profile/${user?._id}`}>
          <img
            className="max-w-7 w-36 h-36 border border-blue-500 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={user?.profile || avatar}
            alt="avatar"
          />
        </Link>
        <div className="flex-1 relative">
          <label htmlFor="input-post">
            {inputText && text.length > 0 && (
              <img
                className="w-5 absolute right-4 cursor-pointer top-2 "
                src={greensend}
                alt="send"
                onClick={handlerCommentsSubmit}
              />
            )}
            {!inputText && text.length === 0 && (
              <img
                className="w-7 absolute right-4 cursor-pointer top-1 lg:top-1.5 opacity-70"
                src={cross}
                alt="send"
                onClick={handlerCross}
              />
            )}

            <input
              type="text"
              className="h-8 w-full border-[0.2px] rounded-full focus:border-blue-400  bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="input-post"
              id="post"
              maxLength={40}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

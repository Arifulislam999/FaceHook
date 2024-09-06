/* eslint-disable react/prop-types */
import send from "../../assets/icons/send.svg";
import greensend from "../../assets/icons/greenSend.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentShowInActive,
  inputColorSend,
} from "../../Redux/Features/Post/PostSlice";
import { useDebounce } from "../hooks/useDebounce";
import { useCommentPostMutation } from "../../Redux/Features/Post/postAPI";
import Toast from "../Toast/Toast";
import { usePostNotificationMutation } from "../../Redux/Features/Notification/notificationAPI";
const ModalInputBox = ({ id, postCreatorId }) => {
  const dispatch = useDispatch();

  const { inputText } = useSelector((state) => state.mindStatus);
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
    console.log(text.length);
    if (text.length > 0 && text !== "") {
      dispatch(commentShowInActive());
      setText("");

      try {
        const userName = user.firstName + " " + user?.lastName;
        const userImg = user?.profile;
        await commentPost({ id, text, userName, userImg });
        await postNotification({
          data: { postCreatorId: postCreatorId, postId: id, action: "Comment" },
        });
      } catch (error) {
        console.log("error comment submit");
      }
    } else {
      setTosatMessage("Please type your message!");
      const timer = setTimeout(() => {
        setTosatMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
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
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 w-36 h-36 border border-blue-500 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={user.profile}
          alt="avatar"
        />

        <div className="flex-1 relative">
          <label htmlFor="input-post">
            <img
              className="w-5 absolute right-4 cursor-pointer top-2 "
              src={inputText && text.length > 0 ? greensend : send}
              alt="send"
              onClick={handlerCommentsSubmit}
            />
            <input
              type="text"
              className="h-8 w-full border-[0.2px] rounded-full focus:border-blue-400  bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="input-post"
              id="post"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind?${user.firstName}...`}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalInputBox;

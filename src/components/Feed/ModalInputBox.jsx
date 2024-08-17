import avatar from "../../assets/images/avatars/user1.jpeg";
import send from "../../assets/icons/send.svg";
import greensend from "../../assets/icons/greenSend.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputColorSend } from "../../Redux/Features/Post/PostSlice";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
const ModalInputBox = () => {
  const dispatch = useDispatch();
  const { inputText } = useSelector((state) => state.mindStatus);

  const [text, setText] = useState("");
  const debounceSearch = useDebounce(text);

  useEffect(() => {
    if (debounceSearch.length > 0) {
      dispatch(inputColorSend(true));
    } else {
      dispatch(inputColorSend(false));
    }
  }, [dispatch, debounceSearch]);

  const handlerCommentsSubmit = () => {
    console.log("click");
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <Link to="/me">
          <img
            className="max-w-7 w-36 h-36 border border-blue-500 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={avatar}
            alt="avatar"
          />
        </Link>
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
              placeholder="What's on your mind?"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalInputBox;

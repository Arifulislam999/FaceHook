import { useDispatch, useSelector } from "react-redux";
import { InputComment } from "./InputComment";
import SingleComment from "./SingleComment";
import { allCommentShowActive } from "../../Redux/Features/Post/PostSlice";
import AllCommentModal from "../Modals/AllCommentModal";
const FeedComments = () => {
  const { inputBoxShow, allComment } = useSelector((state) => state.mindStatus);

  const dispatch = useDispatch();

  const handlerComments = () => {
    dispatch(allCommentShowActive());
  };
  return (
    <div>
      <InputComment />
      <div
        className={`${
          inputBoxShow.boxStatus
            ? "duration-300 translate-y-0  "
            : "  duration-300  -translate-y-7  "
        }`}
      >
        <div>
          <button
            className="text-gray-300 max-md:text-sm cursor-pointer hover:text-gray-400 duration-100 transition-all hover:opacity-70"
            onClick={handlerComments}
          >
            All Comment ▾
          </button>
        </div>
        {/* <!-- comments --> */}
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {/* <!-- single comment --> */}
          <SingleComment />
          <SingleComment />
          <SingleComment />
        </div>
      </div>
      {/* <!-- comments ends --> */}

      {/* comments modal  */}
      {allComment && <AllCommentModal />}
    </div>
  );
};

export default FeedComments;

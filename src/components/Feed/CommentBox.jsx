import Coments from "../../assets/icons/comment.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  commentShowActive,
  commentShowInActive,
} from "../../Redux/Features/Post/PostSlice";
const CommentBox = ({ id, comments }) => {
  const dispatch = useDispatch();
  const { inputBoxShow } = useSelector((state) => state.mindStatus);
  const handlerComments = () => {
    if (inputBoxShow.boxStatus) {
      dispatch(commentShowInActive());
      dispatch(commentShowActive(id));
    } else {
      dispatch(commentShowActive(id));
    }
  };
  // console.log(commentShow);
  return (
    <>
      <button
        onClick={handlerComments}
        className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm z-40"
      >
        <img src={Coments} alt="Comment" />
        <span>Comment({comments?.length || 0})</span>
      </button>
    </>
  );
};

export default CommentBox;

/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { InputComment } from "./InputComment";
import openBox from "../../assets/icons/openBox.svg";
import SingleComment from "./SingleComment";
import {
  allCommentShowActive,
  modalLoadingActive,
  singleModalPostId,
} from "../../Redux/Features/Post/PostSlice";
import AllCommentModal from "../Modals/AllCommentModal";
import Shadaw from "../Loader/Shadaw";

const FeedComments = ({ id, comments, post, postCreatorId }) => {
  const { inputBoxShow, allComment, modalLoading } = useSelector(
    (state) => state.mindStatus
  );
  const dispatch = useDispatch();
  const handlerComments = (id) => {
    dispatch(modalLoadingActive());
    dispatch(allCommentShowActive());
    dispatch(singleModalPostId(id));
  };

  const startIndex = Math.max(comments.length - 3, 0);
  return (
    <div>
      <InputComment id={id} postCreatorId={postCreatorId} />
      <div
        className={`${
          inputBoxShow.boxStatus
            ? "duration-300 translate-y-0 "
            : "  duration-300  -translate-y-7"
        }`}
      >
        {comments.length > 0 && (
          <div>
            <button
              className="text-gray-300 max-md:text-sm cursor-pointer hover:text-gray-400 duration-100 transition-all hover:opacity-70"
              onClick={() => handlerComments(post?._id)}
            >
              All Comment ▾
            </button>
          </div>
        )}
        {/* <!-- comments --> */}
        <div className="space-y-2 divide-y divide-lighterDark pl-2 lg:pl-3">
          {/* <!-- single comment --> */}
          {comments.length > 0 ? (
            comments
              ?.slice(startIndex)
              .map((cmn, i) => <SingleComment key={i} comment={cmn} />)
          ) : (
            <div className="flex flex-col">
              <h2 className="text-center text-sm lg:text-xl   text-gray-300 mt-2">
                No one has commented yet, you are the first to comment.
              </h2>
              <div className="text-center">
                <img
                  width={50}
                  src={openBox}
                  alt="empty box"
                  className="opacity-80 shadow-2xl block mx-auto mt-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <!-- comments ends --> */}

      {/* comments modal  */}
      {modalLoading && <Shadaw />}
      {allComment && <AllCommentModal />}
    </div>
  );
};

export default FeedComments;

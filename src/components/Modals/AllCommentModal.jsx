import { useDispatch, useSelector } from "react-redux";
import TimeIcon from "../../assets/icons/time.svg";
import Close from "../../assets/icons/close.svg";
import openBox from "../../assets/icons/openBox.svg";

import { allCommentShowInActive } from "../../Redux/Features/Post/PostSlice";
import "./modalStyle.css";
import ModalInputBox from "../Feed/ModalInputBox";
import { timeDifference } from "../utils/timeDirrerence";
import SingleComment from "../Feed/SingleComment";
const AllCommentModal = () => {
  const dispatch = useDispatch();
  const { modalPost } = useSelector((state) => state.mindStatus);
  const { description, createdAt, comments, poster, creatorId, _id } =
    modalPost || {};
  const { firstName, lastName, profile, _id: postCreatorId } = creatorId || {};
  const handlerClick = () => {
    dispatch(allCommentShowInActive());
  };
  const sortedComment = [];
  for (let i = comments.length - 1; i >= 0; i--) {
    sortedComment.push(comments[i]);
  }
  return (
    <div
      onClick={handlerClick}
      className="z-50 w-full h-[100%] fixed top-0 bottom-0 bg-custom-dark left-0 right-0 "
    >
      <div className="h-screen z-9999 flex  items-center justify-center ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-50 w-[80%] max-h-[32rem] 2xl:max-h-[40rem] bg-mediumDark p-4 border-2 overflow-x-hidden modalcss border-gray-500 rounded-md relative"
        >
          <div>
            <div className="relative ">
              <h2 className="text-xl text-center pb-2 font-semibold">
                {firstName}
                {`'`}s Post
              </h2>
              <div className="absolute -top-1 right-2">
                <img
                  onClick={handlerClick}
                  className="w-6 h-6 text-white cursor-pointer"
                  src={Close}
                  alt="close"
                />
              </div>
              <hr />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <img
                className="max-w-10 border border-blue-500 w-44 h-44 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={profile}
                alt="avatar"
              />
              <div>
                <h6 className="text-lg lg:text-xl">
                  {firstName} {lastName}
                </h6>
                <div className="flex items-center gap-1.5">
                  <img src={TimeIcon} alt="time" />
                  <span className="text-sm text-gray-400 lg:text-base">
                    {timeDifference(createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* poster  */}

          <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            {/* <!-- If Post has Image, Render this block --> */}
            <div className="flex items-center justify-center overflow-hidden">
              <img
                className="w-full lg:w-3/4 h-80 lg:h-96 rounded-md border mb-3 "
                src={poster}
                alt="poster"
              />
            </div>
            <p className=" lg:mx-5 text-justify indent-5">{description}</p>
          </div>
          <div className="my-3 ">
            <ModalInputBox id={_id} postCreatorId={postCreatorId} />
          </div>
          <div className="mt-4">
            <button className="text-gray-300 max-md:text-sm">
              Most relevant comment ▾
            </button>
            <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
              {/* <!-- single comment --> */}
              {sortedComment.length > 0 ? (
                sortedComment?.map((cmn, i) => (
                  <SingleComment key={i} comment={cmn} />
                ))
              ) : (
                <div className="flex flex-col">
                  <h2 className="text-center text-sm lg:text-xl capitalize  text-gray-300 mt-2">
                    No one has posted yet, you are the first to post.
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
        </div>
      </div>
    </div>
  );
};

export default AllCommentModal;

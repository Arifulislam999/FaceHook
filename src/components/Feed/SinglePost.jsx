import TimeIcon from "../../assets/icons/time.svg";
import Poster from "../../assets/images/fakeuser.png";
import Share from "../../assets/icons/share.svg";
import { Link, useLocation } from "react-router-dom";
import { useGetSinglePostQuery } from "../../Redux/Features/Post/postAPI";
import { useTitle } from "../hooks/useTitle";
import { useEffect, useState } from "react";
import { timeDifference } from "../utils/timeDirrerence";
import Shadaw from "../Loader/Shadaw";
import Like from "./Like";
import { useSelector } from "react-redux";
import CommentBox from "./CommentBox";
import FeedComments from "./FeedComments";

const SinglePost = () => {
  const pathname = useLocation();

  const id = pathname.pathname.split("/")[2];
  const { user } = useSelector((state) => state.loginUser);
  const [post, setPost] = useState([]);

  const {
    data: singleUserPost,
    isLoading,
    isSuccess,
  } = useGetSinglePostQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setPost(singleUserPost?.data);
    }
  }, [isSuccess, singleUserPost]);

  const { creatorId, poster, description, comments, likes, createdAt, _id } =
    post || {};
  const { firstName, lastName, profile, _id: userId } = creatorId || {};
  // title hooks
  useTitle();

  return (
    <main className="mx-auto max-w-[1020px] ">
      <div className="sm:container mx-2">
        <article className="card mt-6 lg:mt-8">
          {/* <!-- post header --> */}
          <header className="flex items-center justify-between gap-4">
            {/* <!-- author info --> */}
            <div className="flex items-center gap-3">
              <Link to={`/profile/${userId}?name=${firstName}${lastName}`}>
                <img
                  className="max-w-10 border border-blue-500 w-44 h-44 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                  src={profile || Poster}
                  alt="avatar"
                />
              </Link>

              <div className="flex">
                <div>
                  <Link to={`/profile/${userId}?name=${firstName}${lastName}`}>
                    <h6 className="text-lg lg:text-xl">
                      {firstName} {lastName}
                    </h6>
                  </Link>

                  <div className="flex items-center gap-0.5 -ml-1">
                    <img src={TimeIcon} alt="time" />
                    <span className="text-sm text-gray-400 lg:text-base">
                      {timeDifference(createdAt)}
                    </span>
                  </div>
                </div>
                {isLoading && <Shadaw />}
              </div>
            </div>

            {/* <!-- action dot --> */}
            {/* edit post  start */}

            {/* {userId === user._id && <EditPost userId={userId} post={post} />} */}

            {/* edit post  end */}

            {/* <!-- action dot ends --> */}
          </header>
          {/* <!-- post header ends --> */}

          {/* <!-- post body --> */}
          <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            {/* <!-- If Post has Image, Render this block --> */}
            <div className="flex items-center justify-center overflow-hidden ">
              <img
                draggable={false}
                className={`max-w-full ${
                  isLoading && "opacity-20"
                } w-[560px] h-80  shadow-2xl lg:h-[470px] object-fill rounded-sm mb-2`}
                src={poster || Poster}
                alt="poster"
              />
            </div>
            <p className="indent-5 text-justify ">{description} </p>
          </div>
          {/* <!-- post body ends --> */}

          {/* <!-- post actions --> */}
          <div className="flex items-center justify-between py-4 lg:px-10 ">
            {/* <!-- Like Button --> */}
            <Like
              Likes={likes}
              id={_id}
              userId={userId}
              loginUserId={user?._id}
            />

            {/* <!-- Comment Button --> */}
            <CommentBox id={_id} comments={comments} />
            {/* <!-- Share Button --> */}

            {/* <!-- Like Button --> */}
            <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
              <img src={Share} alt="Share" />
              <span>Share</span>
            </button>
          </div>
          {/* <!-- post actions  --> */}

          <FeedComments
            post={post}
            id={_id}
            comments={comments}
            postCreatorId={userId}
          />
        </article>
      </div>
    </main>
  );
};

export default SinglePost;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LikeIcon from "../../assets/icons/like.svg";
import blueLike from "../../assets/icons/blueLike.svg";
import { usePostLikeMutation } from "../../Redux/Features/Post/postAPI";
import { useSelector } from "react-redux";
import Toast from "../Toast/Toast";
const Like = ({ Likes, id }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const { user } = useSelector((state) => state.loginUser);

  const [postLike, { isError, error, isLoading }] = usePostLikeMutation();
  const alreadyLikeThisPost = Likes.some(
    (like) => like.likeUserId === user?._id
  );
  const handlerLike = (id) => {
    try {
      postLike({ data: id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setToastMessage(error?.data?.message);
  }, [isError, error]);
  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <button
        disabled={isLoading}
        onClick={() => handlerLike(id)}
        className="flex-center gap-2  text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img
          src={alreadyLikeThisPost ? blueLike : LikeIcon}
          alt="Like"
          width={20}
          className="-mt-1"
        />
        <span className={`${alreadyLikeThisPost && "text-blue-500"}`}>
          Like({Likes.length || 0})
        </span>
      </button>
    </>
  );
};

export default Like;

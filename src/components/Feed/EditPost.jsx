/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TDots from "../../assets/icons/3dots.svg";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  editModalActive,
  getEditPostId,
} from "../../Redux/Features/Post/PostSlice";
import EditModal from "../Modals/EditModal";
import { useDeletePostMutation } from "../../Redux/Features/Post/postAPI";
import Shadaw from "../Loader/Shadaw";
import Toast from "../Toast/Toast";
const EditPost = ({ userId, post }) => {
  const { user } = useSelector((state) => state.loginUser);
  const { editModal } = useSelector((state) => state.mindStatus);
  const dispatch = useDispatch();
  const [dot, setDot] = useState(false);
  const [err, setErr] = useState(null);

  const [deletePost, { data: deletePostData, isSuccess, isLoading }] =
    useDeletePostMutation();

  const handlerEditPost = (id) => {
    dispatch(editModalActive());
    setDot(false);
    dispatch(getEditPostId(id));
  };
  const handlerDeletePost = async (id) => {
    await deletePost(id);
    setDot(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setErr(deletePostData?.messate);
    }
    const timer = setTimeout(() => {
      setErr(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isSuccess, deletePostData]);
  return (
    <>
      {err && <Toast message={err} />}
      {isLoading && <Shadaw />}
      {userId === user?._id && (
        <div className="relative z-50">
          <button onClick={() => setDot((prev) => !prev)}>
            <img src={TDots} alt="3dots of Action" />
          </button>
          {/* <!-- Action Menus Popup --> */}
          {dot && (
            <div className="action-modal-container">
              <button
                className="action-menu-item hover:text-favGreen"
                onClick={() => handlerEditPost(post._id)}
              >
                <img src={Edit} alt="Edit" />
                Edit
              </button>
              <button
                className="action-menu-item hover:text-red-500"
                onClick={() => handlerDeletePost(post._id)}
              >
                <img src={Delete} alt="Delete" />
                Delete
              </button>
            </div>
          )}
          {editModal && <EditModal />}
        </div>
      )}
    </>
  );
};

export default EditPost;

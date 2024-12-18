import Close from "../../assets/icons/close.svg";
import addPhoto from "../../assets/icons/addPhoto.svg";
import Toast from "../Toast/Toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mindPostInActive } from "../../Redux/Features/Post/PostSlice";
import { useUserPostMutation } from "../../Redux/Features/Post/postAPI";

const PostModal = () => {
  const dispatch = useDispatch();
  const [userPost, { data: uploadPost, isLoading, isError, error }] =
    useUserPostMutation();
  const { mindPostModalStatus } = useSelector((state) => state.mindStatus);
  const { user } = useSelector((state) => state.loginUser);

  const ref = useRef(null);
  const [cross, setCross] = useState(mindPostModalStatus);
  const [status, setStatus] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [poster, setPoster] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [err, setErr] = useState(null);

  const handlerPostSubmit = async () => {
    setErr(null);
    if (status === null || status === "") {
      setErr("Please add your status!");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else if (poster?.size / 1024 > 1025 * 5) {
      setErr("File size is too large. Maximum size is 5MB.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else if (poster) {
      const formData = new FormData();
      formData.append("image", poster);
      formData.append("post", status);
      formData.append("isPublic", isPublic);
      await userPost(formData);
      setStatus(null);
      setIsPublic(true);
    } else {
      setErr("Fill all input box.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    setErr(error?.data?.message);
  }, [isError, error]);

  useEffect(() => {
    setErr(null);
    setErr(uploadPost?.message);
    dispatch(mindPostInActive());
    setPoster(null);
    setStatus(null);
  }, [uploadPost, dispatch]);

  useEffect(() => {
    ref?.current?.focus();
    setCross(mindPostModalStatus);
  }, [cross, mindPostModalStatus]);

  const handlerClick = () => {
    dispatch(mindPostInActive());
    setCross(mindPostModalStatus);
  };

  return (
    <>
      {err && <Toast message={err} />}
      {cross && (
        <div
          onClick={handlerClick}
          className="z-10000 w-full h-[100%] fixed top-0 bottom-0 bg-custom-dark left-0 right-0 "
        >
          <div className="h-screen z-9999 flex items-center justify-center ">
            <div
              onClick={(e) => e.stopPropagation()}
              className="z-50 w-[90%] md:w-[60%] lg:w-[40%] min-h-72 bg-mediumDark p-4 border-2 border-gray-500 rounded-md"
            >
              <div className="relative">
                <h2 className="text-xl text-center pb-2">Create a post</h2>
                <div className="absolute -top-2 right-2">
                  <img
                    onClick={handlerClick}
                    className="w-6 h-6 text-white cursor-pointer"
                    src={Close}
                    alt="close"
                  />
                </div>
                <hr />
              </div>
              <div className="mt-2 flex">
                <div>
                  <img
                    className="max-w-8 w-36 h-36 border border-blue-500 max-h-8 rounded-full lg:max-h-[40px] lg:max-w-[40px]"
                    src={user?.profile}
                    alt="avatar"
                  />
                </div>
                <div className="pl-2 ">
                  <p className="font-semibold -mt-1">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <div className="flex bg-gray-700 w-[5.3rem] rounded-sm cursor-pointer">
                    <select
                      name="option"
                      className="bg-gray-700 border-0 outline-none"
                      onChange={(e) => setIsPublic(e.target.value)}
                    >
                      <option value="true">Public</option>
                      <option value="false">Private</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-1 ">
                  <textarea
                    ref={ref}
                    type="text"
                    value={status || ""}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-16 w-full  rounded-md bg-lighterDark p-3 focus:outline-none sm:h-[7rem]"
                    name="post"
                    id="post"
                    placeholder={`What's on your mind, ${user?.firstName}...?`}
                  ></textarea>
                </div>
                <div className="my-3">
                  <label
                    className="btn-primary cursor-pointer !text-gray-100"
                    htmlFor="photo"
                  >
                    <img src={addPhoto} alt="Add Photo" />
                    Add Photo
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    id="photo"
                    className="hidden"
                    onChange={(e) =>
                      setPoster(
                        e.target.files[0],
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                      )
                    }
                  />
                </div>
                {imagePreview && (
                  <div className="border border-gray-300 w-full h-44 mb-2 rounded-sm">
                    <img
                      className="w-full h-44"
                      src={imagePreview && imagePreview}
                      alt="picture"
                    />
                  </div>
                )}
                <div>
                  <button
                    disabled={isLoading}
                    className="auth-input bg-blue-500 font-bold text-white/80 transition-all hover:opacity-90"
                    type="button"
                    onClick={handlerPostSubmit}
                  >
                    {isLoading ? "Loading..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;

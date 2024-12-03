import Close from "../../assets/icons/close.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editModalInActive } from "../../Redux/Features/Post/PostSlice";
import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../Redux/Features/Post/postAPI";
import Loading from "../Loader/Loading";
import Toast from "../Toast/Toast";
const EditModal = () => {
  const dispatch = useDispatch();
  const { editModal, editPostId: id } = useSelector(
    (state) => state.mindStatus
  );
  const [singleP, setSingleP] = useState([]);

  const [userImage, setUserImage] = useState(null);
  const [imgPreview, setImagePreview] = useState(null);
  const { data: singlePost, isSuccess, isLoading } = useGetSinglePostQuery(id);
  const { poster, description, _id } = singleP || {};
  const { firstName, lastName, profile } = singleP?.creatorId || {};
  const [updatePost, { isLoading: existIsLoading }] = useUpdatePostMutation();
  const [textP, setTextP] = useState(description);
  const [isPublic, setIsPublic] = useState(true);
  const ref = useRef(null);
  const [cross, setCross] = useState(editModal);
  const [err, setErr] = useState(null);

  useEffect(() => {
    ref?.current?.focus();
    setCross(editModal);
  }, [cross, editModal]);

  const handlerClick = async (e) => {
    e.preventDefault();
    if (userImage?.size / 1024 > 1025 * 5) {
      setErr("File size is too large. Maximum size is 5MB.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else if (textP.length < 1) {
      setErr("Please fill the status box.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      const formData = new FormData();
      formData.append("image", userImage);
      formData.append("post", textP);
      formData.append("isPublic", isPublic);
      await updatePost({ id: _id, formData });
    }
    dispatch(editModalInActive());
    setCross(editModal);
  };
  const handlerClickClose = () => {
    dispatch(editModalInActive());
    setCross(editModal);
  };
  useEffect(() => {
    if (isSuccess) {
      setSingleP(singlePost?.data);
      setTextP(singlePost?.data.description);
      setImagePreview(null);
      console.log(singlePost?.data?.isPublic);
    }
  }, [isSuccess, singlePost]);

  return (
    <>
      {err && <Toast message={err} />}

      {isLoading && <Loading />}
      {existIsLoading && <Loading />}
      {cross && (
        <form
          onSubmit={handlerClick}
          className="z-10000 w-full h-[100%] fixed top-0 bottom-0 bg-custom-dark left-0 right-0"
        >
          <div className="h-screen z-9999 flex items-center justify-center ">
            <div
              onClick={(e) => e.stopPropagation()}
              className="z-50 w-[90%] md:w-[60%] lg:w-[40%] min-h-72 bg-mediumDark p-4 border-2 border-gray-500 rounded-md"
            >
              <div className="relative">
                <h2 className="text-xl text-center pb-2">Edit a post</h2>
                <div className="absolute -top-2 right-2">
                  <img
                    onClick={handlerClickClose}
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
                    src={profile}
                    alt="avatar"
                  />
                </div>
                <div className="pl-2 ">
                  <p className="font-semibold -mt-1">
                    {firstName} {lastName}
                  </p>
                  <div className="flex bg-gray-700 w-[5.3rem] rounded-md cursor-pointer">
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
                    className="h-16 w-full  rounded-md bg-lighterDark p-3 focus:outline-none sm:h-[7rem]"
                    name="post"
                    id="post"
                    value={textP}
                    onChange={(e) => setTextP(e.target.value)}
                    placeholder={`What's on your mind, ${firstName}?`}
                    maxLength={400}
                  ></textarea>
                </div>
                <div className="my-3">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    id="photo"
                    className="block w-full text-sm text-gray-400 border rounded-lg cursor-pointer bg-gray-700 focus:outline-none  border-gray-600 placeholder-gray-400"
                    onChange={(e) =>
                      setUserImage(
                        e.target.files[0],
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                      )
                    }
                  />
                </div>
                {imgPreview ? (
                  <div className="border border-gray-300 w-full h-44 mb-2 rounded-sm">
                    <img
                      className="w-full h-44"
                      src={imgPreview}
                      alt="picture"
                    />
                  </div>
                ) : (
                  <div className="border border-gray-300 w-full h-44 mb-2 rounded-sm">
                    <img className="w-full h-44" src={poster} alt="picture" />
                  </div>
                )}
                <div>
                  <button
                    className="auth-input bg-blue-500 font-bold text-white/80 transition-all hover:opacity-90"
                    type="submit"
                  >
                    {existIsLoading ? "Uploading..." : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditModal;

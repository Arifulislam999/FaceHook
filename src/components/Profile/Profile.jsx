import avatar from "../../assets/images/avatars/user1.jpeg";
import edit from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/tick.svg";
import bellBlue from "../../assets/icons/bellBlue.svg";
import FeedPost from "../Feed/FeedPost";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateBioMutation,
  useUploadImageMutation,
} from "../../Redux/Features/userApi/userAPI";
import Loading from "../Loader/Loading";
import Toast from "../Toast/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetSingleUserQuery } from "../../Redux/Features/AuthApi/authApi";
import { loginUser } from "../../Redux/Features/userApi/UserSlice";
import BlankPost from "./BlankPost";

export const Profile = () => {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const pathname = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginUser);

  const ll = JSON.stringify(pathname).split("/")[2].split(",");
  const searchId = ll[0].slice(0, -1);

  const [editMode, setEditMode] = useState(false);
  const [updateBio, { data: updateBioData, isSuccess }] =
    useUpdateBioMutation();
  const [uploadImage, { data: uploadData, isSuccess: uploadSuccess }] =
    useUploadImageMutation();

  // single user
  const [frontUser, setFrontUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const {
    data: singleUserData,
    isError,
    isLoading,
  } = useGetSingleUserQuery(searchId);
  useEffect(() => {
    if (singleUserData?.data) {
      setFrontUser(singleUserData?.data);
      setUserPosts(singleUserData?.singleUserPost);
      setBio(singleUserData?.data.bio);
    }
  }, [singleUserData]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const [bio, setBio] = useState(frontUser?.bio);
  const [frontDp, setFrontDp] = useState();
  const [editDp, setEditDp] = useState(false);
  const [frontProfile, setFrontProfile] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handlerDpChack = () => {
    setEditDp(true);
  };
  const handlerProfileCheck = () => {
    setEditProfile(true);
  };
  const handlerDp = async () => {
    setEditDp(false);
    if (frontDp) {
      setToastMessage(null);
      if (frontDp.size / 1024 > 1025) {
        setToastMessage("File size is too large. Maximum size is 1MB.");
        const timer = setTimeout(() => {
          setToastMessage(null);
        }, 4000);

        return () => clearTimeout(timer);
      } else {
        const formData = new FormData();
        formData.append("image", frontDp);

        // Append additional data
        formData.append("picture", "dp");
        await uploadImage(formData);
      }
    }
  };

  const handlerProfile = async () => {
    setEditProfile(false);
    if (frontProfile) {
      setToastMessage(null);
      if (frontProfile.size / 1024 > 1025) {
        setToastMessage("File size is too large. Maximum size is 1MB.");
        const timer = setTimeout(() => {
          setToastMessage(null);
        }, 4000);

        return () => clearTimeout(timer);
      } else {
        const formData = new FormData();
        formData.append("image", frontProfile);
        // Append additional data
        formData.append("picture", "profile");
        await uploadImage(formData);
      }
    }
  };

  // upload image Effect

  useEffect(() => {
    if (uploadSuccess && uploadData) {
      setToastMessage(uploadData?.message);
      dispatch(loginUser(uploadData?.data));
    }
  }, [uploadData, uploadSuccess, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setToastMessage(updateBioData?.message);
    }
  }, [updateBioData, isSuccess]);

  // ref call
  useEffect(() => {
    textareaRef?.current?.focus();
  }, [editMode]);
  const handlerBioSubmit = async () => {
    setEditMode(false);
    setToastMessage(null);
    try {
      await updateBio({ data: bio });
    } catch (error) {
      console.log(error);
    }
  };
  return !isLoading ? (
    <>
      <div>{toastMessage && <Toast message={toastMessage} />}</div>
      <main className="mx-auto max-w-[1020px] py-2">
        <div className="sm:container mx-2">
          {/* <!-- profile info --> */}
          <div className=" py-8 text-center">
            {/* Background DP  */}
            <div className="relative mb-8 w-full top-0 left-0 ">
              <img
                className="max-w-full object-cover rounded-lg  absolute  w-full h-60 lg:h-80 border border-blue-500"
                src={frontUser?.dp}
                alt={frontUser?.firstName}
              />

              {/* <button className="flex-center absolute  -bottom-10 right-4 h-7 w-7 rounded-full bg-black/80 hover:bg-black/80">
                <img src={edit} alt="Edit" title="Edit cover picture." />
              </button> */}
              {user?._id === frontUser?._id && (
                <label
                  className="flex-center absolute  -bottom-10 right-4 h-7 w-7 rounded-full bg-black/80 hover:bg-black/80 cursor-pointer"
                  htmlFor="ProfilephotoDP"
                >
                  {editDp ? (
                    <>
                      <img
                        src={checkIcon}
                        alt="Add Photo"
                        onClick={handlerDp}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="ProfilephotoDP"
                        className="hidden"
                        onChange={(e) => setFrontDp(e.target.files[0])}
                      />
                    </>
                  ) : (
                    <img src={edit} alt="Add Photo" onClick={handlerDpChack} />
                  )}
                </label>
              )}
            </div>

            {/* <!-- profile image --> */}
            <div className="relative mb-8   top-12 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:top-32 lg:left-0.5 lg:max-w-[218px]">
              <img
                className="max-w-full rounded-full w-40 h-40 border border-blue-500"
                src={frontUser?.profile ? frontUser?.profile : avatar}
                alt={frontUser?.firstName}
              />

              {/* <button className="flex-center absolute  bottom-4 right-[5.3rem] h-7 w-7 rounded-full bg-black/80 hover:bg-black/80">
                <img src={edit} alt="Edit" title="Edit main picture." />
              </button> */}

              {user?._id === frontUser?._id && (
                <label
                  className="flex-center cursor-pointer absolute bottom-4 right-12  lg:bottom-4 lg:right-[5.3rem] h-7 w-7 rounded-full bg-black/80 hover:bg-black/80"
                  htmlFor="Profilephoto"
                >
                  {editProfile ? (
                    <>
                      <img
                        src={checkIcon}
                        alt="Add Photo"
                        onClick={handlerProfile}
                      />
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        id="Profilephoto"
                        className="hidden"
                        onChange={(e) => setFrontProfile(e.target.files[0])}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={edit}
                        alt="Add Photo"
                        onClick={handlerProfileCheck}
                      />
                    </>
                  )}
                </label>
              )}
            </div>

            {/* <!-- name , email --> */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mt-8 lg:mt-24 text-white lg:text-[28px]">
                {frontUser?.firstName} {frontUser?.lastName}
              </h3>
              <p className="leading-[231%] lg:text-lg">{frontUser?.email}</p>
              <div className="flex">
                <p className="leading-[231%] lg:text-lg text-blue-400">
                  {frontUser?.followers?.length || 0} followers
                </p>
                <img width={15} src={bellBlue} alt="bell" className="ml-2" />
              </div>
            </div>

            {/* <!-- bio --> */}
            <div className="mt-2 flex items-start gap-2 lg:mt-4">
              <div className="flex-1">
                {!editMode ? (
                  <div className="leading-[188%] text-justify capitalize text-gray-400 lg:text-lg  indent-5 ml-2">
                    {frontUser?.bio?.length === 0 || bio === undefined ? (
                      <h2 className="text-center mr-2">
                        {user?._id === frontUser?._id
                          ? "Please Click Button beside & Update Bio Information."
                          : `${frontUser.firstName} ${frontUser.lastName} hasn't changed  bio information yet!`}
                      </h2>
                    ) : (
                      frontUser?.bio
                    )}
                  </div>
                ) : (
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      name="bio-data"
                      id="bio-data"
                      className="p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full bg-mediumDark leading-[188%]  text-gray-400 lg:text-lg rounded-md "
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      cols={55}
                      maxLength={400}
                    />
                  </div>
                )}
              </div>
              {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
              {user?._id === frontUser?._id && (
                <>
                  {!editMode ? (
                    <button className="flex-center h-7 w-7 rounded-full">
                      <img
                        src={edit}
                        alt="Edit"
                        onClick={() => setEditMode(true)}
                      />
                    </button>
                  ) : (
                    <button className="flex-center h-7 w-7 rounded-full">
                      <img
                        src={checkIcon}
                        alt="Check"
                        onClick={handlerBioSubmit}
                      />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="w-full border-b border-[#3F3F3F] py-6 lg:py-8"></div>
          </div>
          {/* <!-- end profile info --> */}

          <h4 className="mt-2 text-xl lg:mt-4 lg:text-2xl">
            {user?._id === frontUser?._id
              ? "My Posts"
              : `${frontUser.firstName} ${frontUser.lastName} Posts`}
          </h4>

          {/* <!-- post  --> */}

          {userPosts?.length === 0 ? (
            <h2 className="text-center">
              <BlankPost />
            </h2>
          ) : (
            userPosts?.map((p, index) => <FeedPost key={index} post={p} />)
          )}
        </div>
      </main>
    </>
  ) : (
    <Loading />
  );
};

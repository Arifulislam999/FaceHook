import Me from "../../assets/images/fakeuser.png";
import Star from "../../assets/icons/WhiteStar.svg";
import blueStar from "../../assets/icons/blueStart.svg";
import ActiveDot from "./ActiveDot";
import MessageInput from "./MessageInput";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetSingleUserForChatQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Toast from "../Toast/Toast";
import Shadaw from "../Loader/Shadaw";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChatUser } from "../../Redux/Features/Chat/ChatRight/chatRightSlice";
import MessageInputRemove from "./MessageInputRemove";
import InActiveDot from "./InActiveDot";

import {
  useAddFavouriteMutation,
  useGetFavouriteQuery,
} from "../../Redux/Features/Favourite/favouriteApi.js";

const ChatRightHead = () => {
  const { id: searchId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { user } = useSelector((state) => state.loginUser);
  const id = queryParams.get("id") || searchId;
  const [cUser, setCUser] = useState([]);
  const [toast, setToast] = useState("");
  const { loginUserBySocket } = useSelector((state) => state.socketLoginUser);

  const [existUser, setExistUser] = useState(false);

  const { data: chatUser, isLoading } = useGetSingleUserForChatQuery(
    id || user?._id
  );

  const [addFavourite, { data: responseData, error, isError }] =
    useAddFavouriteMutation();
  const { data: favouriteData } = useGetFavouriteQuery(id);

  useEffect(() => {
    if (chatUser?.message === "success") {
      setCUser(chatUser?.data);
      dispatch(selectChatUser(chatUser?.data));
    }
  }, [chatUser, dispatch]);

  useEffect(() => {
    if (favouriteData?.message === "success") {
      setExistUser(favouriteData?.status);
    }
  }, [favouriteData]);

  useEffect(() => {
    if (responseData?.message) {
      setToast(responseData?.message);
    } else if (isError) {
      setToast(error?.message);
    }
    const timer = setTimeout(() => {
      setToast("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [responseData, isError, error]);

  const handlerUserAdd = async (id) => {
    setExistUser((prev) => !prev);
    await addFavourite({ data: id });
  };

  return (
    <div>
      {id && (
        <div className="flex justify-between p-3  bg-gray-800 border-b border-[#3F3F9F] shadow-xl">
          {isLoading && <Shadaw />}
          <>{toast && <Toast message={toast} />}</>
          <div className="flex sticky">
            <img
              className="w-12 h-12 border border-r-indigo-300 rounded-full"
              src={cUser?.profile || Me}
              alt="picture"
            />
            <div className="ml-2">
              {loginUserBySocket.includes(id) ? <ActiveDot /> : <InActiveDot />}
            </div>
            <div className="flex flex-col ml-1 ">
              <Link
                to={`/profile/${chatUser?.data._id}?name=${chatUser?.data.firstName} ${chatUser?.data.lastName}`}
              >
                <span className="mt-1 text-lg font-bold">
                  {cUser?.firstName} {cUser?.lastName}
                </span>
              </Link>
              <span className="text-[10px] -mt-1 text-gray-400 -pt-3">
                {loginUserBySocket.includes(id) ? (
                  <span className="text-sm">online</span>
                ) : (
                  <span className="text-sm">offline</span>
                )}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <img
              className="w-6 h-6 cursor-pointer"
              src={existUser ? blueStar : Star}
              alt="bell"
              onClick={() => handlerUserAdd(chatUser?.data._id)}
            />
          </div>
        </div>
      )}

      {/* input  */}
      {id ? (
        <div className={`fixed bottom-0 md:w-[659px] w-full`}>
          <MessageInput />
        </div>
      ) : (
        <div className={`fixed bottom-0 md:w-[659px] w-full`}>
          <MessageInputRemove />
        </div>
      )}
    </div>
  );
};

export default ChatRightHead;

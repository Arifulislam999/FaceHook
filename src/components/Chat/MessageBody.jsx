import { useSelector } from "react-redux";
import ChatReceiver from "./ChatRecever";
import ChatRightHead from "./ChatRightHead";
import ChatSender from "./ChatSender";
import { useEffect, useState } from "react";
import { useGetMessageQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Shadaw from "../Loader/Shadaw";
import { useLocation } from "react-router-dom";
import NoChatSelected from "./NoChatSelected";
import { useTitle } from "../hooks/useTitle";

const MessageBody = () => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  const location = useLocation();
  const { user } = useSelector((state) => state.loginUser);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [allMessage, setAllMessage] = useState([]);
  let existId = id ? true : false;
  const {
    data: responseMessage,
    isLoading,
    isSuccess,
  } = useGetMessageQuery(id, { skip: !existId });
  useEffect(() => {
    if (isSuccess) {
      setAllMessage(responseMessage?.message);
    }
  }, [responseMessage, isSuccess]);

  // title hooks
  useTitle();

  return (
    <div className={`${windowWidth < 640 && "hidden"} sm:block basis-2/3`}>
      {isLoading && <Shadaw />}
      <div className="sticky top-0 overflow-x-hidden scrollbar-hidden">
        <ChatRightHead />
      </div>
      <div className="bg-slowDark min-h-[80vh] xl:min-h-[90vh] pb-2">
        {allMessage?.length === 0 || !id ? (
          <>
            <NoChatSelected />
          </>
        ) : (
          allMessage?.map((mBody, index) => {
            if (mBody.senderId === user._id) {
              return <ChatSender key={index} messages={mBody} />;
            } else {
              return <ChatReceiver key={index} messages={mBody} />;
            }
          })
        )}
      </div>
      <div className="pt-14"></div>
    </div>
  );
};

export default MessageBody;

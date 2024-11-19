import { useSelector } from "react-redux";
import ChatReceiver from "./ChatRecever";
import ChatRightHead from "./ChatRightHead";
import ChatSender from "./ChatSender";
import { useParams } from "react-router-dom";
import { useGetMessageQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Shadaw from "../Loader/Shadaw";
import { useEffect, useState } from "react";

const MessageBodyMobile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.loginUser);
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  // message request

  const [allMessage, setAllMessage] = useState([]);
  const {
    data: responseMessage,
    isLoading,
    isSuccess,
  } = useGetMessageQuery(id);
  useEffect(() => {
    if (isSuccess) {
      setAllMessage(responseMessage?.message);
    }
  }, [responseMessage, isSuccess]);

  return (
    <div className={`${windowWidth > 640 && "hidden"} sm:block basis-2/3`}>
      {isLoading && <Shadaw />}
      <div className="sticky top-0 overflow-x-hidden scrollbar-hidden">
        <ChatRightHead />
      </div>
      <div className="bg-slowDark min-h-screen pb-2">
        {allMessage?.length === 0 ? (
          <h2>No conversation yet</h2>
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
      <div className="pt-12"></div>
    </div>
  );
};

export default MessageBodyMobile;

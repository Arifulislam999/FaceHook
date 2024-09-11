import { useSelector } from "react-redux";
import ChatReceiver from "./ChatRecever";
import ChatRightHead from "./ChatRightHead";
import ChatSender from "./ChatSender";

const MessageBody = () => {
  const { windowWidth } = useSelector((state) => state.tokenStatus);
  return (
    <div className={`${windowWidth < 640 && "hidden"} sm:block basis-2/3`}>
      <div className="sticky top-0 overflow-x-hidden scrollbar-hidden">
        <ChatRightHead />
      </div>
      <div className="bg-slowDark min-h-screen pb-2">
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />

        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
        <ChatSender />
        <ChatReceiver />
      </div>
      <div className="pt-14"></div>
    </div>
  );
};

export default MessageBody;

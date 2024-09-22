/* eslint-disable react/prop-types */
import ChatUserLeft from "./ChatUserLeft";

const ChatAll = ({ chatList }) => {
  return (
    <div className="bg-mediumDark mx-3 flex-grow">
      <ChatUserLeft chatList={chatList} />
    </div>
  );
};

export default ChatAll;

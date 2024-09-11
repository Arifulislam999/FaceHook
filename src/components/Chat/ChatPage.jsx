import ChatLeftHead from "./ChatLeftHead";

import MessageBody from "./MessageBody";

import "./chatButton.css";
const ChatPage = () => {
  return (
    <main className="mx-auto max-w-[1020px] ">
      <div className="sm:container">
        <div className="flex">
          <div className=" basis-full sm:basis-1/3   bg-mediumDark min-h-screen max-h-screen overflow-y-auto scrollbar-hidden sticky top-0">
            <div className="">
              <ChatLeftHead />
            </div>
          </div>
          <MessageBody />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

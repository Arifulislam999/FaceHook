import { useSelector } from "react-redux";
import ChatReceiver from "./ChatRecever";
import ChatRightHead from "./ChatRightHead";
import ChatSender from "./ChatSender";
import { useEffect, useRef, useState } from "react";
import { useGetMessageQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Shadaw from "../Loader/Shadaw";
import { useLocation } from "react-router-dom";
import NoChatSelected from "./NoChatSelected";
import { useTitle } from "../hooks/useTitle";
import NoChatYet from "./NoChatYet";
import UpArrow from "./UpArrow";

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

  // make height in chat  div
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState(0); // Track position during scroll
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const updateHeightAndPosition = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setHeight(rect.height); // Get the current height
        setPosition(rect.top); // Get the top position relative to the viewport
      }
    };

    // Initial measure on mount
    updateHeightAndPosition();

    // Add scroll and resize listeners
    window.addEventListener("scroll", updateHeightAndPosition);
    window.addEventListener("resize", updateHeightAndPosition);

    return () => {
      // Cleanup listeners on unmount
      window.removeEventListener("scroll", updateHeightAndPosition);
      window.removeEventListener("resize", updateHeightAndPosition);
    };
  }, []);

  useEffect(() => {
    if (divRef.current) {
      setDist(position); // Get the top position relative to the viewport
    }
  }, [height]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth", // Optional: Smooth scrolling
    });
  };

  return (
    <div className={`${windowWidth < 640 && "hidden"} sm:block basis-2/3`}>
      {isLoading && <Shadaw />}
      <div className="sticky top-0 overflow-x-hidden scrollbar-hidden">
        <ChatRightHead />
      </div>
      <div
        className="bg-slowDark min-h-[80vh] xl:min-h-[90vh] pb-2"
        ref={divRef}
      >
        {allMessage?.length === 0 && !id ? (
          <>
            <NoChatSelected />
          </>
        ) : allMessage?.length === 0 || !id ? (
          <>
            <NoChatYet />
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
      {Math.abs(dist) > 900 &&
        Math.abs(dist) - Math.abs(position) > 200 &&
        Math.abs(position) > 220 && (
          <div className=" fixed" onClick={scrollToTop}>
            <UpArrow />
          </div>
        )}

      <div className="pt-14"></div>
    </div>
  );
};

export default MessageBody;

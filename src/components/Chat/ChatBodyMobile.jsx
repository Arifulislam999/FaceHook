import { useSelector } from "react-redux";
import ChatReceiver from "./ChatRecever";
import ChatRightHead from "./ChatRightHead";
import ChatSender from "./ChatSender";
import { useParams } from "react-router-dom";
import { useGetMessageQuery } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import Shadaw from "../Loader/Shadaw";
import { useEffect, useRef, useState } from "react";
import Loading from "../Loader/Loading";
import UpArrow from "./UpArrow";
import socket from "../../socket-client/socket-client";

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

  // socket //

  useEffect(() => {
    // Register user to Socket.IO on login
    if (user?._id) {
      socket.emit("register", { userId: user?._id });
    }
    // Remove existing listener to avoid duplicates
    socket.off("receive_message");

    // listen the user on socket connect
    socket.on("receive_message", (newMessage) => {
      if (
        (newMessage?.receiverId == id && newMessage?.senderId == user?._id) ||
        (newMessage?.receiverId == user?._id && newMessage?.senderId == id)
      ) {
        setAllMessage((prevChat) => [...prevChat, newMessage]);
      }
    });
    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [user?._id, id]);

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
    <div className={`${windowWidth > 640 && "hidden"} sm:block basis-2/3`}>
      {isLoading && <Shadaw />}
      <div className="sticky top-0 overflow-x-hidden scrollbar-hidden">
        <ChatRightHead />
      </div>
      <div className="bg-slowDark min-h-screen pb-2" ref={divRef}>
        {allMessage?.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          allMessage?.map((mBody, index) => {
            if (mBody?.senderId === user._id) {
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
      <div className="pt-12"></div>
    </div>
  );
};

export default MessageBodyMobile;

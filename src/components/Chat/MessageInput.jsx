import Send from "../../assets/icons/send.svg";
import greenSend from "../../assets/icons/greenSend.svg";
import ImageIcon from "../../assets/icons/imageIcon.svg";
import { useRef, useState } from "react";
import { useSendMessageMutation } from "../../Redux/Features/Chat/ChatRight/chatRightAPI";
import { useLocation, useParams } from "react-router-dom";

const MessageInput = () => {
  const inputRef = useRef(null);
  const { id: mobileId } = useParams();
  const location = useLocation();
  const [text, setText] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id") || mobileId;
  const [sendMessage] = useSendMessageMutation();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    inputRef.current.focus();
    let Text = text;
    setText("");
    if (Text) {
      await sendMessage({ data: { text: Text, id } });
    }
  };
  return (
    <div className="flex justify-between w-full max-w-[659px] mx-auto items-center p-2 md:p-3 sticky bottom-0 bg-gray-800 border-t border-[#3F3F9F] shadow-xl">
      {/* Image Icon */}
      <div className="flex items-center">
        <img
          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-transform transform hover:scale-110"
          src={ImageIcon}
          alt="ImageIcon"
        />
      </div>

      {/* Input and Send Button */}
      <form onSubmit={handlerSubmit} className="flex flex-grow items-center">
        <div className="flex-grow mx-2 md:mx-4">
          <div className="flex items-center bg-gray-700 px-3 py-1.5 md:px-4 md:py-1 rounded-full shadow-lg">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Type a message"
              className="w-full bg-transparent border-none text-gray-300 text-sm md:text-base placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Send Button */}
        <div className="flex items-center">
          <button type="submit">
            <img
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-transform transform hover:scale-110"
              src={text?.length > 0 ? greenSend : Send}
              alt="Send"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;

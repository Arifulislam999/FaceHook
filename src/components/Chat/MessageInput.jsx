import Send from "../../assets/icons/send.svg";
import ImageIcon from "../../assets/icons/imageIcon.svg";

const MessageInput = () => {
  return (
    <div className="flex justify-between  w-full max-w-[659px] mx-auto items-center p-2 md:p-3 sticky bottom-0 bg-gray-800 border-t border-[#3F3F9F] shadow-xl">
      <div className="flex items-center">
        <img
          className="w-5 h-5 md:w-5 md:h-5 cursor-pointer transition-transform transform hover:scale-110"
          src={ImageIcon}
          alt="ImageIcon"
        />
      </div>
      <div className="flex-grow mx-2 md:mx-4">
        <div className="flex items-center bg-gray-700 px-3 py-1.5 md:px-4 md:py-1 rounded-full shadow-lg">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent border-none text-gray-300 text-sm md:text-base placeholder-gray-500 outline-none"
          />
        </div>
      </div>
      <div className="flex items-center">
        <img
          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-transform transform hover:scale-110"
          src={Send}
          alt="Send"
        />
      </div>
    </div>
  );
};

export default MessageInput;

/* eslint-disable react/prop-types */
import ChatUserLeft from "./ChatUserLeft";

const FavouriteList = ({ chatList }) => {
  return (
    <div className="bg-mediumDark mx-3 flex-grow  ">
      <ChatUserLeft chatList={chatList} />
    </div>
  );
};

export default FavouriteList;

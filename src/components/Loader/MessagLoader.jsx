import "./messageLoader.css";

const MessageLoader = () => {
  return (
    <div className="middle-loader bg-custom-dark">
      <div className="message-center-loader">
        <div className="m-loader">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="loader_item"
              style={{ "--i": index + 1 }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageLoader;

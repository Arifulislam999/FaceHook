import "./commentLoader.css";
const CommentLoader = () => {
  return (
    <div className="middle-loaders bg-custom-dark">
      <div className="h-screen  flex items-center justify-center">
        <div className="spinner-l"></div>
      </div>
    </div>
  );
};

export default CommentLoader;

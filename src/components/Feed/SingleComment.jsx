import avatar2 from "../../assets/images/avatars/user2.webp";

const SingleComment = () => {
  return (
    <div className="flex items-center gap-3 pt-4">
      <img
        className="max-w-6 w-24 h-24 border border-red-400 max-h-6 rounded-full"
        src={avatar2}
        alt="avatar2"
      />
      <div>
        <div className="flex gap-1 text-xs lg:text-sm">
          <span className="font-bold cursor-pointer hover:text-blue-300 duration-100 transition-all hover:opacity-70">
            Tapas Adhikari:{" "}
          </span>
          <span>Great Sumit Saha dada ❤</span>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

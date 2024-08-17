import { useDispatch, useSelector } from "react-redux";
import { mindPostActive } from "../../Redux/Features/Post/PostSlice";
const FeedStatus = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginUser);
  const handlerClick = () => {
    dispatch(mindPostActive());
  };
  return (
    <div className="card">
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-10 border border-white w-44 h-44 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={user?.profile}
          alt="avatar"
        />

        <div className="flex-1">
          <textarea
            onClick={handlerClick}
            className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
            name="post"
            id="post"
            placeholder={`What's on your mind?${user?.firstName}...`}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FeedStatus;

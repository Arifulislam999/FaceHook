import { useDispatch } from "react-redux";
import avatar from "../../assets/images/avatars/user2.webp";
import TimeIcon from "../../assets/icons/time.svg";
import Poster from "../../assets/images/poster.png";
import Close from "../../assets/icons/close.svg";
import { allCommentShowInActive } from "../../Redux/Features/Post/PostSlice";
import "./modalStyle.css";
import ModalInputBox from "../Feed/ModalInputBox";
import SingleComment from "../Feed/SingleComment";
const AllCommentModal = () => {
  const dispatch = useDispatch();

  const handlerClick = () => {
    dispatch(allCommentShowInActive());
  };
  return (
    <div
      onClick={handlerClick}
      className="z-50 w-full h-[100%] fixed top-0 bottom-0 bg-custom-dark left-0 right-0 "
    >
      <div className="h-screen z-9999 flex  items-center justify-center ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-50 w-[80%] max-h-[30rem] bg-mediumDark p-4 border-2 overflow-x-hidden modalcss border-gray-500 rounded-md relative"
        >
          <div>
            <div className="relative ">
              <h2 className="text-xl text-center pb-2 font-semibold">
                Siam`s Post
              </h2>
              <div className="absolute -top-1 right-2">
                <img
                  onClick={handlerClick}
                  className="w-6 h-6 text-white cursor-pointer"
                  src={Close}
                  alt="close"
                />
              </div>
              <hr />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <img
                className="max-w-10 border border-blue-500 w-44 h-44 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={avatar}
                alt="avatar"
              />
              <div>
                <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
                <div className="flex items-center gap-1.5">
                  <img src={TimeIcon} alt="time" />
                  <span className="text-sm text-gray-400 lg:text-base">
                    12 min ago
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* poster  */}

          <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            {/* <!-- If Post has Image, Render this block --> */}
            <div className="flex items-center justify-center overflow-hidden">
              <img className="max-w-full" src={Poster} alt="poster" />
            </div>
            <p className="mx-2 lg:mx-5 text-justify indent-5">
              Grateful for the incredible experience of serving as the President
              of the Grand Jury board for this year`s Digital Marketing Award
              organized by Bangladesh Brand Forum. Judging the best digital
              marketing campaigns was not just a responsibility but a journey of
              appreciation for innovation and creativity. The judging process,
              ensuring transparency, brought to light so many beautiful
              campaigns. Cheers to the dynamic world of digital marketing!
              sdfasd asdca sdfa sdca sdfa
            </p>
          </div>
          <div className="my-3 ">
            <ModalInputBox />
          </div>
          <div className="mt-4">
            <button className="text-gray-300 max-md:text-sm">
              Most relevant comment ▾
            </button>
            <SingleComment />
            <SingleComment />
            <SingleComment />
            <SingleComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCommentModal;

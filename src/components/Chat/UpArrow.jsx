import arrow from "../../assets/icons/uparrow.svg";
const UpArrow = () => {
  return (
    <div className="fixed bottom-16 right-[1%] sm:right-[3%] lg:right-[9.5%] xl:right-[12%] x1440:right-[19%] 2xl:right-[25%] cursor-pointer w-44 hover:opacity-90 transition-all delay-100">
      <div className="flex bg-deep-dark px-4 py-1 rounded-xl ">
        <div>
          <span className=" text-xl pl-2 ">Move to top</span>
        </div>
        <div className="w-50 pt-2 ml-2">
          <img src={arrow} alt="upArrow" width={17} height={17} />
        </div>
      </div>
    </div>
  );
};

export default UpArrow;

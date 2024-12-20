import { motion } from "framer-motion";
import EmptyNoti from "../../assets/icons/NoNoti.svg";
const EmptyNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-deepDark text-center">
      <motion.img
        src={EmptyNoti}
        alt="Open Post"
        className="w-40 h-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <h1 className="lg:text-2xl  text-xl font-bold text-gray-300 mt-8">
        You Have No Notification Yet.
      </h1>
    </div>
  );
};

export default EmptyNotification;

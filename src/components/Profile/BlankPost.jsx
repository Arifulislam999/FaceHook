import { motion } from "framer-motion";
import openPost from "../../assets/images/openPost.png";

const BlankPost = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-deepDark text-center">
      <motion.img
        src={openPost}
        alt="Open Post"
        className="w-40 h-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <h1 className="lg:text-2xl text-xl font-bold text-gray-300 mt-8">
        No Post Yet..
      </h1>
    </div>
  );
};

export default BlankPost;

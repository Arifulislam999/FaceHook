/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

const NoFollowers = () => {
  // Define the bounce effect for the text
  const bounceTransition = {
    y: {
      duration: 0.5,
      yoyo: Infinity, // Makes the bounce repeat indefinitely
      ease: "easeOut",
    },
  };

  // Define a wiggle effect for the SVG
  const wiggleTransition = {
    rotate: {
      duration: 0.8,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-white">
      {/* Animated Container */}
      <motion.div
        className="flex flex-col items-center text-gray-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }} // Slight scaling effect on hover
      >
        {/* SVG with Wiggle Effect */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={wiggleTransition}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm-6 4a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM22 11c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-2 8a5.977 5.977 0 00-3-5.196A4.97 4.97 0 0120 11h-2a5.977 5.977 0 013 5.804V19z"
          />
        </motion.svg>

        {/* Bouncing Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={bounceTransition}
        >
          You don't have any followers yet.
        </motion.p>

        <motion.p
          className="text-sm md:text-base text-gray-500 mt-2 mx-3 text-center"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Start following others to build your community!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoFollowers;

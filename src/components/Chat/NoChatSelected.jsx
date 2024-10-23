import { motion } from "framer-motion";

const NoChatSelected = () => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity, // Creates a bouncing effect
      ease: "easeOut",
    },
  };

  const wiggleTransition = {
    rotate: {
      duration: 0.5,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-[80vh] xl:min-h-[90vh] pb-2 flex justify-center items-center">
      {/* Animated Container */}
      <motion.div
        className="flex flex-col items-center text-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }} // Slight scaling effect on hover
      >
        {/* SVG Chat Bubble Icon with Wiggle Effect */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 md:w-16 md:h-16 text-blue-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={wiggleTransition} // Wiggle effect on the icon
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h6M12 20C6.477 20 2 16.418 2 12c0-4.418 4.477-8 10-8s10 3.582 10 8c0 1.778-.773 3.415-2.051 4.695A9.987 9.987 0 0112 20zm0 0l-4 4v-4z"
          />
        </motion.svg>

        {/* Bouncing Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={bounceTransition}
        >
          No messages selected! Select an user from left sidebar to view all
          messages.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;

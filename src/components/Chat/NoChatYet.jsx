import { motion } from "framer-motion";

const NoChatYet = () => {
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
            d="M3 8l7.5 4.5L18 8m-15 8h18V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"
          />
        </motion.svg>

        {/* Bouncing Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={bounceTransition}
        >
          No Message Yet....! Write Message and Start Conversation.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoChatYet;

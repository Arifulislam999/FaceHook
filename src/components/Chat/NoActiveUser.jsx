import { motion } from "framer-motion";

const NoActiveUser = () => {
  const bounceTransition = {
    y: {
      duration: 0.5,
      yoyo: Infinity, // Makes the bounce repeat indefinitely
      ease: "easeOut",
    },
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-white">
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
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1.1, rotate: 5 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c4.418 0 8 2.686 8 6s-3.582 6-8 6-8-2.686-8-6 3.582-6 8-6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15c4.418 0 8 2.686 8 6H4c0-3.314 3.582-6 8-6z"
          />
          <circle cx="12" cy="9" r="1.5" fill="currentColor" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
        </motion.svg>

        {/* Bouncing Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={bounceTransition}
        >
          No Active User.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoActiveUser;

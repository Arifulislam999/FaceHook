import { motion } from "framer-motion";

const NoFavourite = () => {
  const bounceTransition = {
    y: {
      duration: 0.5,
      yoyo: Infinity, // Makes the bounce repeat indefinitely
      ease: "easeOut",
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
        {/* Replaced SVG with Animation */}
        <motion.svg
          fill="#5994f3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#5994f3"
          strokeWidth="0.6"
          className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mb-4"
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1.1, rotate: 5 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M19.73,16.663A3.467,3.467,0,0,0,20.5,14.5a3.5,3.5,0,0,0-7,0,3.467,3.467,0,0,0,.77,2.163A6.04,6.04,0,0,0,12,18.69a6.04,6.04,0,0,0-2.27-2.027A3.467,3.467,0,0,0,10.5,14.5a3.5,3.5,0,0,0-7,0,3.467,3.467,0,0,0,.77,2.163A6,6,0,0,0,1,22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1A6,6,0,0,0,19.73,16.663ZM7,13a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,7,13ZM3.126,21a4,4,0,0,1,7.748,0ZM17,13a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,17,13Zm-3.874,8a4,4,0,0,1,7.748,0ZM6,2V8A1,1,0,0,0,7,9H9.865l1.367,1.641a1,1,0,0,0,1.536,0L14.135,9H17a1,1,0,0,0,1-1V2a1,1,0,0,0-1-1H7A1,1,0,0,0,6,2ZM8,3h8V7H13.667a1,1,0,0,0-.769.359L12,8.438l-.9-1.079A1,1,0,0,0,10.333,7H8Z"></path>
          </g>
        </motion.svg>

        {/* Bouncing Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={bounceTransition}
        >
          No Favourite User.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoFavourite;

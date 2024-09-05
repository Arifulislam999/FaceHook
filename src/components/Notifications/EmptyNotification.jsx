import { motion } from "framer-motion";
const EmptyNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-deepDark text-center">
      <motion.svg
        className="w-40 h-40 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 179.006 179.006"
        version="1.1"
        stroke="currentColor"
        strokeWidth={2}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <g id="SVGRepo_iconCarrier">
          <g>
            <path
              style={{ fill: "#919092" }}
              d="M135.848,46.327L89.509,0L43.176,46.327l-22.71,13.109v79.711l69.037,39.859l69.037-39.859V59.436 
               L135.848,46.327z M151.021,60.993L109.94,84.527V49.161h20.58L151.021,60.993z M48.499,49.161h20.58v35.366L27.997,60.999 
               L48.499,49.161z M86.961,171.625l-61.375-34.697V65.51l61.369,35.503v70.612H86.961z M89.581,96.186L74.186,86.89V44.041H52.693 
               L89.509,7.226l36.816,36.816H104.82v42.854l-14.273,8.724L89.581,96.186z M153.432,136.617l-61.369,35.008v-70.612l61.369-35.503 
               V136.617z"
            />
          </g>
        </g>
      </motion.svg>
      <h1 className="lg:text-2xl  text-xl font-bold text-gray-300 mt-8">
        You Have No Notification Yet.
      </h1>
    </div>
  );
};

export default EmptyNotification;

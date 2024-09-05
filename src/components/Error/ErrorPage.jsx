import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-center">
      <motion.svg
        className="w-40 h-40 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </motion.svg>
      <h1 className="text-4xl font-bold text-gray-300 mt-8">
        404 - Page Not Found
      </h1>
      <p className="text-gray-200 mt-4">
        {` Oops! The page you're looking for doesn't exist.`}
      </p>
      <a
        href="/"
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;

import { motion } from "framer-motion";
import loginPhoto from "../../assets/images/loginImage.png";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const ForgotPassword = () => {
  return (
    <div>
      <nav className="sticky top-0 z-50 w-full border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div>
            <Link to="/">
              <img
                className="max-w-[80px] md:max-w-[100px] lg:max-w-[130px] rounded-full"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <Link to="/login">
              <button
                className="px-4 py-2 rounded bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="button"
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start mt-10 lg:mt-0">
        <div className="lg:basis-1/2 px-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl my-3 text-gray-300">
              Forgot Password?
            </h2>
            <p className="text-gray-400 text-sm lg:text-lg mb-6">
              Reset your password using your email address.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <form>
              <div className="mb-4">
                <label className="block text-gray-400 text-lg" htmlFor="email">
                  Your Email Address <sup className="text-gray-200">*</sup>
                </label>
                <p className="text-gray-500 text-sm mb-2">
                  The email address you registered with.
                </p>
                <input
                  className="auth-input w-full p-3 rounded border border-gray-500 bg-gray-700 text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-300"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <button
                className="w-full px-4 py-2 mt-4 rounded bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
              >
                Send Verification Link
              </button>
            </form>
          </div>
        </div>

        <div className="lg:basis-1/2 mt-10 lg:mt-0 flex justify-center">
          {/* Framer Motion applied to the image */}
          <motion.img
            src={loginPhoto}
            alt="auth_illustration"
            className="w-[300px] sm:w-[400px] lg:w-[500px] max-w-full rounded-md shadow-lg"
            animate={{
              y: [0, -20, 0], // Moves the image up and down
            }}
            transition={{
              duration: 2, // Duration of one complete cycle
              repeat: Infinity, // Repeat the animation indefinitely
              repeatType: "loop", // Ensures it loops smoothly
              ease: "easeInOut", // Smooth ease in and out motion
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
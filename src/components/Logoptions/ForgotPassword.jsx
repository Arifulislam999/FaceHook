import { motion } from "framer-motion";
import loginPhoto from "../../assets/images/loginImage.png";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logoIcon.png";
import { useEffect, useState } from "react";
import { useUserResetPasswordMutation } from "../../Redux/Features/userApi/userAPI";
import Toast from "../Toast/Toast";
import Shadaw from "../Loader/Shadaw";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [
    userResetPassword,
    { data: backendResponse, isSuccess, isLoading, isError, error },
  ] = useUserResetPasswordMutation();
  const handlerSubmitEmail = async (e) => {
    e.preventDefault();

    await userResetPassword({ data: email });
  };
  useEffect(() => {
    if (isSuccess) {
      setRes(backendResponse?.message);
    }
  }, [isSuccess, backendResponse]);
  useEffect(() => {
    if (isError) {
      setErr(error?.data.message);
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isError, error]);
  return (
    <div>
      {err && <Toast message={err} />}
      {isLoading && <Shadaw />}
      <nav className="sticky top-0 z-50 w-full border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div>
            <Link to="/">
              <div className="flex">
                <img
                  className="max-w-[100px] rounded-full w-12"
                  src={Logo}
                  alt="logo"
                />
                <span className="font-bold mt-3 ml-0.5 text-xl logoStyle">
                  LinkSy
                </span>
              </div>
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
        <div className="lg:basis-1/2 px-6 mt-4 lg:mt-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl my-3 text-gray-300">
              Forgot Password?
            </h2>
            <p className="text-gray-400 text-sm lg:text-lg mb-6">
              Reset your password using your email address.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <form onSubmit={handlerSubmitEmail}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                disabled={isLoading}
                className="w-full px-4 py-2 mt-4 rounded bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
              >
                {isLoading ? "Processing..." : "Send Verification Link"}
              </button>
              {res && (
                <div className="text-center mt-2">
                  <span className=" text-gray-600 py-0.5 mt-1 text-sm lg:text-lg capitalize bg-white px-3 rounded-sm shadow-xl">
                    {res}
                  </span>
                </div>
              )}
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

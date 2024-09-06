import { motion } from "framer-motion";
import loginPhoto from "../../assets/images/loginImage.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logoIcon.png";

import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import { useUserConfirmPasswordMutation } from "../../Redux/Features/userApi/userAPI";
import Shadaw from "../Loader/Shadaw";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get specific query parameters
  const token = queryParams.get("token");
  const id = queryParams.get("id");
  const [p, setP] = useState("");
  const [cp, setCP] = useState("");
  const [err, setErr] = useState(null);
  const [
    userConfirmPassword,
    { data: backendResponse, isSuccess, isLoading, isError, error },
  ] = useUserConfirmPasswordMutation();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (p !== cp) {
      setErr("Password doen't match.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);
      return () => clearTimeout(timer);
    } else if (p.length < 8) {
      setErr("Password must be 8 character or more.");
      const timer = setTimeout(() => {
        setErr(null);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      await userConfirmPassword({ data: { password: p, id, token } });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setErr(backendResponse?.message);
      if (backendResponse?.status === true) {
        navigate("/login");
      }
    }
  }, [isSuccess, backendResponse, navigate]);
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
            <form onSubmit={handlerSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-lg"
                  htmlFor="password"
                >
                  Your New Password <sup className="text-gray-200">*</sup>
                </label>

                <input
                  className="auth-input w-full p-3 rounded border border-gray-500 bg-gray-700 text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-300"
                  name="password"
                  type="password"
                  id="password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="Enter your new password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-lg"
                  htmlFor="cpassword"
                >
                  Confirm Your New Password
                  <sup className="text-gray-200">*</sup>
                </label>

                <input
                  className="auth-input w-full p-3 rounded border border-gray-500 bg-gray-700 text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-300"
                  name="cpassword"
                  type="password"
                  id="cpassword"
                  value={cp}
                  onChange={(e) => setCP(e.target.value)}
                  placeholder="Enter your new confirm password"
                />
              </div>
              <button
                disabled={isLoading}
                className="w-full px-4 py-2 mt-4 rounded bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
              >
                {isLoading ? "Processing..." : " Submit Password"}
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
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;

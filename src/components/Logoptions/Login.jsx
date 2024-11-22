import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import loginPhoto from "../../assets/images/loginImage.png";
import { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../Redux/Features/AuthApi/authApi";
import { useDispatch } from "react-redux";
import { loginStatusActive } from "../../Redux/Features/LogStatus/StatusSlice";
import { loginUser } from "../../Redux/Features/userApi/UserSlice";
import Shadaw from "../Loader/Shadaw";
import { apiSlice } from "../../Redux/Features/API/apiSlice";
import socket from "../../socket-client/socket-client";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState();

  const [
    userLogin,
    { data: userLoginData, isError, isSuccess, error: backendError, isLoading },
  ] = useUserLoginMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErr(null);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        apiSlice.util.invalidateTags(["followers", "chat-user", "logout-chat"])
      );
      await userLogin({ data: user });
    } catch (error) {
      console.log(backendError);
    }
  };

  useEffect(() => {
    if (userLoginData?.token && userLoginData?.status) {
      Cookies.set("token", userLoginData?.token, { expires: 1 });
    }
    if (userLoginData?.status === true) {
      const userId = userLoginData?.data?._id; // Replace with the logged-in user's ID
      socket.emit("user:join", userId);
      dispatch(loginStatusActive());
      navigate("/");
    }
  }, [isSuccess, userLoginData, navigate, dispatch]);

  useEffect(() => {
    if (userLoginData?.data) {
      dispatch(loginUser(userLoginData?.data));
    }
  }, [dispatch, userLoginData]);

  useEffect(() => {
    if (backendError?.data?.message) {
      setErr(backendError?.data?.message);
    }
  }, [isError, backendError]);

  return (
    <>
      {isLoading && <Shadaw />}
      <main className="flex min-h-screen items-center justify-center bg-deepDark px-4">
        <div className="max-w-[1368px] flex-1">
          <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start">
              {/* Motion Image */}
              <motion.img
                src={loginPhoto}
                alt="auth_illustration"
                className="w-[300px] sm:w-[400px] lg:w-[500px] max-w-full rounded-md shadow-lg mt-3"
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
              <div className="mt-6 lg:mt-10 text-center lg:text-left">
                <h1 className="mb-6 text-3xl font-bold lg:text-[40px] logoStyle ">
                  LinkSy
                </h1>
                <p className="max-w-[452px] text-gray-500/95 lg:text-lg ">
                  Create a social media app with features like showing posts,
                  post details, reactions, comments, profile, and other
                  activities.
                </p>
              </div>
            </div>

            <div className="card shadow-lg">
              <form
                className="border-b border-[#3F3F3F] pb-6"
                onSubmit={handlerSubmit}
              >
                <h2 className="text-2xl text-center underline mb-4">Login</h2>

                <div className="form-control mb-4">
                  <label
                    className="block text-gray-400 text-lg mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="auth-input w-full p-3 rounded border border-gray-500 auth-input text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    name="email"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-control mb-4">
                  <label
                    className="block text-gray-400 text-lg mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="auth-input w-full p-3 rounded border border-gray-500 auth-input  text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    name="password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  className="w-full px-4 py-2 rounded bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-blue-200 cursor-pointer hover:opacity-70">
                    <Link to="/forget-password">Forgot password?</Link>
                  </span>
                </div>

                {err && (
                  <p className="text-center mt-2 bg-red-400/80 text-white py-2 rounded-md">
                    {err}
                  </p>
                )}
              </form>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Don’t have an account?{" "}
                  <Link
                    className="text-white transition-all hover:text-favGreen hover:underline"
                    to="/registation"
                  >
                    Create New
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

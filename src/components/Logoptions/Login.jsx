import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authPhoto from "../../assets/images/auth_illustration.png";
import { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../Redux/Features/AuthApi/authApi";
import { useDispatch } from "react-redux";
import { loginStatusActive } from "../../Redux/Features/LogStatus/StatusSlice";
import { loginUser } from "../../Redux/Features/userApi/UserSlice";

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
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 max-w-full max-lg:hidden"
              src={authPhoto}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                Facehook
              </h1>
              <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>

          <div className="card">
            <form
              className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
              onSubmit={handlerSubmit}
            >
              <h2 className="text-2xl text-center underline">Login </h2>

              <div className="form-control">
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control">
                <label className="auth-label" htmlFor="email">
                  Password
                </label>
                <input
                  className="auth-input"
                  name="password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="auth-input bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loging..." : "Login"}
              </button>
              {err && (
                <p className="opacity-70 text-center mt-2 bg-red-400/80 capitalize rounded-md">
                  {err}
                </p>
              )}
            </form>
            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Don’t have account?
                <Link
                  className="text-white transition-all hover:text-lwsGreen hover:underline"
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
  );
};

export default Login;

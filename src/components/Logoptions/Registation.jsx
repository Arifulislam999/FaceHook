import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import RegistationIcon from "../../assets/icons/registration.svg";
import signUpImg from "../../assets/images/Sign up-bro.png";
import { useEffect, useState } from "react";
import { useUserRegistationMutation } from "../../Redux/Features/AuthApi/authApi";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Features/userApi/UserSlice";
import { loginStatusActive } from "../../Redux/Features/LogStatus/StatusSlice";

const Registation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isValidEmail: false,
    bio: "",
    followers: [],
    profile:
      "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png",
    dp: "https://st4.depositphotos.com/5934840/28236/v/450/depositphotos_282365260-stock-illustration-young-man-avatar-cartoon-character.jpg",
  });

  // use from redux
  const [userRegistation, { data: responseSubmitData, error, isLoading }] =
    useUserRegistationMutation();

  useEffect(() => {
    if (error?.data) {
      setErr(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (responseSubmitData?.status === true) {
      Cookies.set("token", responseSubmitData?.token, { expires: 1 });
      Cookies.set("Notification", 0);
      dispatch(loginStatusActive());
      dispatch(loginUser(responseSubmitData?.data));
      navigate("/");
    }
  }, [responseSubmitData, dispatch, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setSubmit(false);
    setErr(null);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.firstName && user.lastName && user.password) {
        if (user.password !== user.confirmPassword) {
          setErr("Password does't match.");
        } else {
          await userRegistation({
            data: user,
          });
        }
      } else {
        setErr("Fill all input field.");
      }
    } catch (err) {
      console.log(error, err);
    }
    setSubmit(true);
    setTimeout(() => {
      setErr(null);
    }, 4000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          {/* <!-- illustration and title --> */}
          <div>
            {/* <!-- src="./assets/images/auth_illustration.png" --> */}
            <img
              className="mb-12 h-96"
              src={signUpImg}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">LinkSy</h1>
              <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>
          {/* <!-- illustration and title ends --> */}
          {/* <!-- login form --> */}
          <div className="card">
            <h2 className="text-2xl text-center underline">Registation </h2>
            <form
              className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
              onSubmit={handlerSubmit}
            >
              {/* <!-- name --> */}
              <div className="form-control">
                <label className="auth-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className={`auth-input ${
                    submit &&
                    user.firstName.length === 0 &&
                    "ring-[0.5px] ring-red-400"
                  }`}
                  name="firstName"
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="auth-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className={`auth-input ${
                    submit &&
                    user.lastName.length === 0 &&
                    "ring-[0.5px] ring-red-400"
                  }`}
                  name="lastName"
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </div>
              {/* <!-- email --> */}
              <div className="form-control">
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  className={`auth-input ${
                    submit &&
                    user.email.length === 0 &&
                    "ring-[0.5px] ring-red-400"
                  }`}
                  name="email"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              {/* <!-- password --> */}
              <div className="form-control">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <input
                  className={`auth-input ${
                    submit &&
                    user.password.length === 0 &&
                    "ring-[0.5px] ring-red-400"
                  }`}
                  name="password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>
              {/* <!-- confirm password --> */}
              <div className="form-control">
                <label className="auth-label" htmlFor="confirmPassword">
                  Retype Password
                </label>
                <input
                  className={`auth-input ${
                    submit &&
                    user.confirmPassword.length === 0 &&
                    "ring-[0.5px] ring-red-400"
                  }`}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              {/* <!-- Submit --> */}
              <button
                disabled={isLoading}
                className="auth-input bg-favGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
              >
                {!isLoading ? "Register" : "Loading..."}
              </button>
              {err && (
                <p className="opacity-70 text-center mt-2 bg-red-400/80 capitalize rounded-md">
                  {err}
                </p>
              )}
            </form>
            <div className="py-4 lg:py-4">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Already have an account?
                <Link
                  className="hover:text-favGreen text-white transition-all hover:underline"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
          {/* <!-- login form ends --> */}
        </div>
      </div>
    </main>
  );
};

export default Registation;

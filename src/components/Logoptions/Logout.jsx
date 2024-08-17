import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";
import Cookies from "js-cookie";
import { loginStatusInActive } from "../../Redux/Features/LogStatus/StatusSlice";
import { useDispatch } from "react-redux";
import { useUserLogOutQuery } from "../../Redux/Features/AuthApi/authApi";
import { useEffect, useState } from "react";
import { loginUserRemove } from "../../Redux/Features/userApi/UserSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState(true);
  const { data: userLogOut } = useUserLogOutQuery(undefined, {
    skip: logOut,
  });
  useEffect(() => {
    if (userLogOut?.status === 200) {
      navigate("/login");
    }
  }, [userLogOut, navigate]);
  const handlerLogOut = () => {
    try {
      Cookies.remove("token");
      setLogOut(false);
      dispatch(loginStatusInActive());
      dispatch(loginUserRemove());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="icon-btn" type="submit" onClick={handlerLogOut}>
      <img src={logout} alt="Logout" />
    </button>
  );
};
export default Logout;

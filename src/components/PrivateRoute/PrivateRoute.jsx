import { Navigate, Outlet } from "react-router-dom";
import { useUserLoginStatus } from "../hooks/useUserLoginStatus";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loading from "../Loader/Loading";
import { useEffect } from "react";
import { getWindoSize } from "../../Redux/Features/Token/TokenSlice";

const PrivateRoute = () => {
  let token = Cookies.get("token");

  const disition = useUserLoginStatus();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.loginStatus);

  useEffect(() => {
    dispatch(getWindoSize(window.innerWidth));
    const handlerResize = () => {
      dispatch(getWindoSize(window.innerWidth));
    };

    window.addEventListener("resize", handlerResize);
    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handlerResize);
  }, [dispatch]);

  if (disition.loading) {
    return <Loading />;
  } else if (status && !disition.loading) {
    return (
      <div>
        {disition.status === true ? <Outlet /> : <Navigate to={"/login"} />}
      </div>
    );
  } else if (token?.length === undefined) {
    return <Navigate to={"/login"} />;
  }
};
export default PrivateRoute;

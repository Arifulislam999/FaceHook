import { Navigate, Outlet } from "react-router-dom";
import { useUserLoginStatus } from "../hooks/useUserLoginStatus";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loading from "../Loader/Loading";

const PrivateRoute = () => {
  let token = Cookies.get("token");

  const disition = useUserLoginStatus();
  const { status } = useSelector((state) => state.loginStatus);

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

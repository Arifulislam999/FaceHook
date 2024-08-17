import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useUserLoginStatusQuery } from "../../Redux/Features/AuthApi/authApi";
import {
  loginStatusActive,
  loginStatusInActive,
} from "../../Redux/Features/LogStatus/StatusSlice";
import { loginUser } from "../../Redux/Features/userApi/UserSlice";
export const useUserLoginStatus = () => {
  const dispatch = useDispatch();
  const { data: loginStatus, isSuccess, isLoading } = useUserLoginStatusQuery();
  const { status } = useSelector((state) => state.loginStatus);
  const { user } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (isSuccess && loginStatus) {
      if (user === null && loginStatus?.data) {
        dispatch(loginUser(loginStatus?.data));
      }
      if (loginStatus.status) {
        dispatch(loginStatusActive());
      } else {
        dispatch(loginStatusInActive());
      }
    }
  }, [isSuccess, dispatch, loginStatus, user]);

  return { status, loading: isLoading };
};

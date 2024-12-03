import { useEffect } from "react";
import Cookies from "js-cookie";

import { useGetNotificationQuery } from "../../Redux/Features/Notification/notificationAPI";
import { useDispatch } from "react-redux";
import { allNotification } from "../../Redux/Features/Notification/notificationSliceStatus";

const NotificationToolTip = () => {
  const dispatch = useDispatch();
  const prevNotification = Cookies.get("Notification");

  const { data, isSuccess } = useGetNotificationQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);
  useEffect(() => {
    if (isSuccess) {
      dispatch(allNotification(data?.notification));
    }
  }, [data, dispatch, isSuccess]);

  return (
    data?.notification?.length - prevNotification > 0 && (
      <div className="absolute w-4 h-4 -mt-10 ml-5">
        <span className=" bg-white px-1 text-[10px] text-deepDark rounded-full border-2 border-red-500">
          {data?.notification?.length - prevNotification > 9
            ? "9+"
            : data?.notification?.length - prevNotification}
        </span>
      </div>
    )
  );
};

export default NotificationToolTip;

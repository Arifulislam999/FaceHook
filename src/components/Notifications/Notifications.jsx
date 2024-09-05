import { useSelector } from "react-redux";
import NotifacionOption from "./NotifacionOption";
import EmptyNotification from "./EmptyNotification";

const Notifications = () => {
  const { notification } = useSelector((state) => state.getNotification);

  return (
    <div className="max-w-[1020px] mx-auto">
      <h2 className="mt-4 font-bold lg:text-xl mx-3">Notifications</h2>
      <h2 className="mt-4 mx-3">New</h2>
      <div className="mx-4 ">
        {notification?.length === 0 ? (
          <EmptyNotification />
        ) : (
          notification?.map((noti) => (
            <NotifacionOption
              key={noti._id}
              image={noti.reactUserImg}
              name={noti.actionCreatorName}
              title={noti.action}
              time={noti.createdAt}
              reactUserId={noti.reactUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

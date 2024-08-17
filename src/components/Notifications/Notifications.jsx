import Poster from "../../assets/images/poster.png";
import NotifacionOption from "./NotifacionOption";

const Notifications = () => {
  return (
    <>
      <div className="mx-4 mt-3">
        <NotifacionOption image={Poster} name="Ariful Islam" title="like" />
        <NotifacionOption
          image={Poster}
          name="Hasan Mahamud Ashik"
          title="comment"
        />
        <NotifacionOption image={Poster} name="Faruk Hasan" title="like" />
        <NotifacionOption image={Poster} name="Abir Mahamud" title="like" />
        <NotifacionOption
          image={Poster}
          name="Mizanur Rahaman"
          title="comment"
        />
      </div>
    </>
  );
};

export default Notifications;

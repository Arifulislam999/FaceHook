/* eslint-disable react/prop-types */
const NotifacionOption = ({ image, name, title }) => {
  return (
    <div className="flex cursor-pointer hover:bg-mediumDark hover:rounded-md my-1  p-2">
      <div>
        <img
          src={image}
          alt="notificationImage"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div>
        <h2 className="mt-2 px-3 text-xl">
          <span className="font-bold ">{name}</span> {title} your recent
          uploaded post, click and check your recent uploaded post`s activities.
        </h2>
      </div>
    </div>
  );
};

export default NotifacionOption;

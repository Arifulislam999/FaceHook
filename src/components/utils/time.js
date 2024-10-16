export const getTimeIn12HourFormat = (Time) => {
  const date = new Date(Time);

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // if hours is 0, make it 12

  // Return the formatted time with AM/PM
  return `${hours}:${minutes} ${ampm}`;
};

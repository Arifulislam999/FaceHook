import { useEffect, useState } from "react";
import "./Toast.css";
import Sound from "../Audio/ALL SOCIAL MEDIA NOTIFICATIONS SOUNDS (mp3cut.net).mp3";
const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Create a new Audio instance inside useEffect
    const notificationSound = new Audio(Sound);

    // Function to play the sound
    const playSound = async () => {
      try {
        await notificationSound.play();
      } catch (error) {
        console.error("Error playing the notification sound:", error);
      }
    };

    // Play the sound
    playSound();

    // Hide the toast after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    // Cleanup function to stop the sound and clear the timer
    return () => {
      clearTimeout(timer);
      notificationSound.pause();
      notificationSound.currentTime = 0; // Reset sound position
    };
  }, []); // Empty dependency array

  return (
    visible && (
      <div className="toast z-10001">
        <div className="toast-content">
          <p className="capitalize text-sm lg:text-[16px]">{message}</p>
        </div>
      </div>
    )
  );
};

export default Toast;

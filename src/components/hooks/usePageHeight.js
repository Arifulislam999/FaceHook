import { useState, useEffect } from "react";

const usePageHeight = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const calculateHeight = () => {
    const currentScrollPosition = window.scrollY;

    setScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    calculateHeight();

    window.addEventListener("scroll", calculateHeight);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", calculateHeight);
    };
  }, []);

  return { scrollPosition };
};

export default usePageHeight;

import { useEffect, useState } from "react";

export const useDebounce = (text, delay = 500) => {
  const [deboounceValue, setDebounceValue] = useState(text);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(text);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return deboounceValue;
};

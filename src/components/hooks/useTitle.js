import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useTitle = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  useEffect(() => {
    document.title = name || "LinkSy Social Application";
  }, [name]);
};

import { useEffect, useState } from "react";
export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  function handleResize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  return width;
}

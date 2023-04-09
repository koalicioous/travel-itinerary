import { useState, useEffect } from "react";

const useViewportWidth = () => {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

export default useViewportWidth;

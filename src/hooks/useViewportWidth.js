import { useState, useEffect } from "react";

const useViewportWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (window) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return width;
};

export default useViewportWidth;

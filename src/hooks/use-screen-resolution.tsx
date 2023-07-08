import { useEffect, useState } from "react";

const useScreenResolution = () => {
  const [windowWidth, setWindowWidth] = useState(900);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const isMobileResolution = windowWidth < 900;
  const isTabletResolution = windowWidth < 1200;

  return { isMobileResolution, isTabletResolution };
};

export default useScreenResolution;

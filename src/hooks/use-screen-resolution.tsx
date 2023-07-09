import { useEffect, useState } from "react";

export const SCREEN_MIN_XS = 900;
export const SCREEN_MIN_MD = 1200;

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

  const isMobileResolution = windowWidth < SCREEN_MIN_XS;
  const isTabletResolution = windowWidth < SCREEN_MIN_MD;

  return { isMobileResolution, isTabletResolution };
};

export default useScreenResolution;

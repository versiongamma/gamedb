import useScreenResolution from "@/hooks/use-screen-resolution";
import { Toolbar } from "@mui/material";
import { styled } from "goober";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 1;
`;

const Header = () => {
  const { isMobileResolution } = useScreenResolution();

  return (
    <StyledToolbar
      sx={{
        backgroundColor: "rgba(0,0,0,0.2)",
        position: "fixed",
        width: "100vw",
        backdropFilter: "blur(1rem)",
      }}
    >
      {isMobileResolution && <MobileNav />}
      {!isMobileResolution && <DesktopNav />}
    </StyledToolbar>
  );
};

export default Header;

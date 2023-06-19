import useScreenResolution from "@/hooks/use-screen-resolution";
import { Toolbar } from "@mui/material";
import { styled } from "goober";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Login from "./login";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  backdrop-filter: blur(1rem);
`;

const Header = () => {
  const { isMobileResolution } = useScreenResolution();

  return (
    <StyledToolbar sx={{}}>
      {isMobileResolution && <MobileNav />}
      {!isMobileResolution && <DesktopNav />}
    </StyledToolbar>
  );
};

export default Header;

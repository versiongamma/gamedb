import useScreenResolution from "@/hooks/use-screen-resolution";
import { Toolbar } from "@mui/material";
import { styled } from "goober";
import { useSession } from "next-auth/react";
import NavigationMenu from "./navigation-menu";
import NavigationTabs from "./navigation-tabs";

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    position: fixed;
    justify-content: space-between;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(1rem);
    z-index: 1;
  }
`;

const Header = () => {
  const { isMobileResolution } = useScreenResolution();
  const { data: session } = useSession();

  return (
    <StyledToolbar sx={{}}>
      {!isMobileResolution && <NavigationTabs />}
      <NavigationMenu />
    </StyledToolbar>
  );
};

export default Header;

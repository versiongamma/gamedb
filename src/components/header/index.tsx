import useScreenResolution from "@/hooks/use-screen-resolution";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "goober";
import NavigationMenu from "./navigation-menu";
import NavigationTabs from "./navigation-tabs";

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    position: fixed;
    justify-content: space-between;
    padding-top: env(safe-area-inset-top);
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    z-index: 1;

    @media screen and (max-width: 900px) {
      margin-bottom: 24px;
    }
  }
`;

const Header = () => {
  const { isMobileResolution } = useScreenResolution();

  return (
    <StyledToolbar>
      {!isMobileResolution && <NavigationTabs />}
      <NavigationMenu />
    </StyledToolbar>
  );
};

export default Header;

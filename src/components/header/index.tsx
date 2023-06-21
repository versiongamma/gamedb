import useScreenResolution from "@/hooks/use-screen-resolution";
import { Toolbar } from "@mui/material";
import { styled } from "goober";
import NavigationMenu from "./navigation-menu";
import NavigationTabs from "./navigation-tabs";
import useDevice from "@/hooks/use-device";

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    position: fixed;
    justify-content: space-between;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    z-index: 1;

    /** Selects iOS devices with the site open as a PWA*/
    @supports (-webkit-touch-callout: none) and (display-mode: standalone) {
      padding-top: 24px;

      @media screen and (max-width: 900px) {
        padding-top: 12px;
      }
    }
  }
`;

const Header = () => {
  const { isMobileResolution } = useScreenResolution();
  const {
    os: { name: os },
  } = useDevice();

  console.log(os);

  return (
    <StyledToolbar>
      {!isMobileResolution && <NavigationTabs />}
      <NavigationMenu />
    </StyledToolbar>
  );
};

export default Header;

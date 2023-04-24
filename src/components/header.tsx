import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import Link from "next/link";
import { styled } from "goober";
import { useRouter } from "next/router";

const StyledTabs = styled(Tabs)`
  .MuiTabs-scroller {
    .MuiTabs-indicator {
      height: 0.15rem;
      background-color: black;
    }
  }
`;

const StyledTab = styled(Tab)`
  margin: 0;
  width: 10rem;
  color: black;
  height: 64px;
`;

const routes = ["/", "/platform"];

const Header = () => {
  const { pathname } = useRouter();

  return (
    <Toolbar sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
      <StyledTabs value={routes.indexOf(pathname)}>
        <Link href="/" passHref>
          <StyledTab label="Games List" value="/" />
        </Link>
        <Link href="/platform" passHref>
          <StyledTab label="By Platform" value="/platform" />
        </Link>
      </StyledTabs>
    </Toolbar>
  );
};

export default Header;

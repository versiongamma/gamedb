import { AppBar, Tab, Tabs, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import { styled } from "goober";
import { useRouter } from "next/router";
import Login from "./login";
import { useSession } from "next-auth/react";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const StyledTabs = styled(Tabs)`
  .MuiTabs-scroller {
    .MuiTabs-indicator {
      height: 0.15rem;
      background-color: white;
    }
  }
`;

const StyledTab = styled(Button)`
  margin: 0;
  width: 10rem;
  height: 64px;
  color: white;
  font-weight: 600;
`;

const routes = ["/", "/wishlist"];

const Header = () => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  return (
    <StyledToolbar
      sx={{
        backgroundColor: "rgba(0,0,0,0.2)",
        position: "fixed",
        width: "100vw",
        backdropFilter: "blur(1rem)",
      }}
    >
      {session && (
        <StyledTabs value={routes.indexOf(pathname)}>
          <Link href="/" passHref>
            <StyledTab value="/">Games List</StyledTab>
          </Link>
          <Link href="/wishlist" passHref>
            <StyledTab value="/wishlist">Wishlist</StyledTab>
          </Link>
        </StyledTabs>
      )}
      <Login />
    </StyledToolbar>
  );
};

export default Header;

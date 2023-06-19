import { Button, Tabs, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Login from "./login";
import { ROUTES } from "./routes";

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

const DesktopNav = () => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <StyledTabs value={pathname}>
          {ROUTES.map(({ name, path }) => (
            <StyledTab key={path} value={path} href={path} LinkComponent={Link}>
              {name}
            </StyledTab>
          ))}
        </StyledTabs>
      )}
      <Login />
    </>
  );
};

export default DesktopNav;

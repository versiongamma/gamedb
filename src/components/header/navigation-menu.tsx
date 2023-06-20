import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Popover } from "@mui/material";
import Button, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { useState } from "react";

import Login from "./login";
import Link from "next/link";
import { ROUTES } from "./routes";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { styled } from "goober";
import useScreenResolution from "@/hooks/use-screen-resolution";

const StyledPopover = styled(Popover)`
  && {
    .MuiPaper-root {
      right: 0;
      left: auto !important;
    }
  }
`;

const MenuWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

type StyledNavButtonProps = {
  $selected: boolean;
} & MuiButtonProps;

const StyledNavButton = styled<StyledNavButtonProps>(Button)`
  && {
    color: white;
    padding: 0.4rem 1.4rem;
    font-weight: 600;

    ${({ $selected }) =>
      $selected ? "background-color: rgba(255, 255, 255, 0.2)" : ""};
  }
`;

const NavigationMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { pathname } = useRouter();
  const { data: session } = useSession();
  const { isMobileResolution } = useScreenResolution();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const pathTitle = ROUTES.find(({ path }) => path === pathname)?.name;
  const title = `GAMEDB${pathTitle ? ` | ${pathTitle}` : ""}`;

  return (
    <>
      {isMobileResolution && <span>{title}</span>}
      <>
        <IconButton onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <StyledPopover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuWrapper>
            {isMobileResolution &&
              ROUTES.map(({ name, path }) => (
                <StyledNavButton
                  key={path}
                  value={path}
                  href={path}
                  LinkComponent={Link}
                  $selected={path === pathname}
                >
                  {name}
                </StyledNavButton>
              ))}
            <Login />
          </MenuWrapper>
        </StyledPopover>
      </>
    </>
  );
};

export default NavigationMenu;

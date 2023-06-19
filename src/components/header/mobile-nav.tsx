import MenuIcon from "@mui/icons-material/Menu";
import { Button, Grow, IconButton, Paper, Popper, styled } from "@mui/material";
import { useState } from "react";

import Login from "./login";

const StyledPopper = styled(Popper)`
  && {
    inset: 8px -16px auto auto !important; /* Forcing a position offset on the menu */
  }
`;

const StyledNavButton = styled(Button)`
  margin: 0;
  width: 10rem;
  height: 64px;
  color: white;
  font-weight: 600;
`;

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  return (
    <>
      <span>GAMEDB</span>
      <IconButton onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <StyledPopper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper>
              <Login />
            </Paper>
          </Grow>
        )}
      </StyledPopper>
    </>
  );
};

export default MobileNav;

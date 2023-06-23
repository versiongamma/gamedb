import { button } from "@/theme";
import { Fab as MuiFab } from "@mui/material";
import { styled } from "goober";

const Fab = styled(MuiFab)`
  && {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    color: ${button.color};
    background-color: ${button.background};
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      color: ${button.hover.color};
      background-color: ${button.hover.background};
    }
  }
`;

export default Fab;

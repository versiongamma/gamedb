import { button } from "@/theme";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "goober";

const Button = styled<MuiButtonProps>((props) => (
  <MuiButton {...props} variant="contained" />
))`
  margin: 0.8rem;
  font-weight: 600;
  border-radius: 2.4rem;
  color: ${button.color};
  background-color: ${button.background};

  &:hover {
    color: ${button.hover.color};
    background-color: ${button.hover.background};
  }
`;

export default Button;

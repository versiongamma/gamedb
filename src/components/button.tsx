import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "goober";

const Button = styled<MuiButtonProps>((props) => (
  <MuiButton {...props} variant="contained" />
))``;

export default Button;

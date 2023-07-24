import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

const Button = (props: Omit<MuiButtonProps, "variant">) => (
  <MuiButton
    {...props}
    variant="contained"
    className="bg-primary-200 text-white hover:bg-primary-100 hover:text-primary-200 m-3 font-semibold rounded-3xl transition"
  />
);

export default Button;

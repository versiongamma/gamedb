import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

const Button = (props: Omit<MuiButtonProps, 'variant'>) => (
  <MuiButton {...props} variant="contained" className="button m-3" />
);

export default Button;

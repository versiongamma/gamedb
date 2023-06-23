import { createTheme } from "@mui/material";

const palette = {
  primary: {
    main: "#9F3EFF",
    faded: "#D9C2FD",
  },
  secondary: "#FFAB32",
  alt: "#22B34B",
  text: "#FEFEFE",
};

export const button = {
  background: palette.primary.main,
  color: palette.text,
  hover: {
    color: palette.primary.main,
    background: palette.primary.faded,
  },
};

export const textField = {
  label: palette.primary.faded,
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default theme;

import { button, textField } from "@/theme";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { styled } from "goober";
import React from "react";

type Props = {
  $background?: string;
} & MuiTextFieldProps;

const TextField = styled<Props>(MuiTextField, React.forwardRef)`
  && {
    margin: 1rem;
    padding-right: 1.6rem;
    color: ${button.color};

    label {
      padding: 0 0.8rem;

      &.Mui-focused {
        color: ${textField.label};
      }
    }

    input {
      padding-left: 20px;

      &.MuiAutocomplete-input {
        padding-left: 12px;
      }

      @media screen and (max-width: 900px) {
        font-size: 0.8rem;
      }
    }

    .MuiInputBase-root {
      border-radius: 2.4rem;
      ${({ $background }) =>
        $background ? `background-color: ${$background};` : ""}

      &::before {
        border-bottom: none;
      }

      &:after {
        border-bottom: none;
      }

      &:hover::before {
        border-bottom: none;
      }
    }

    .MuiFormHelperText-root {
      margin-bottom: -1.4rem; /* Yes negative margins as bad, but doing it this way is a decent quick fix for the error text pushing the inputs down */
    }
  }
`;

export default TextField;

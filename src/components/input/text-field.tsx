import { button, textField } from "@/theme";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { styled } from "goober";
import React from "react";

const TextField = styled<MuiTextFieldProps>(MuiTextField, React.forwardRef)`
  && {
    margin: 0.8rem;
    padding-right: 1.6rem;

    font-weight: 400;
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
    }

    .MuiInputBase-root {
      border-radius: 2.4rem;

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
  }
`;

export default TextField;

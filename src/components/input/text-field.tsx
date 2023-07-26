import { button, textField } from '@/theme';
import FormControl, { FormControlProps } from '@mui/base/FormControl';
import useFormControlContext from '@mui/base/FormControl/useFormControlContext';
import Input from '@mui/base/Input';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { styled } from 'goober';
import React from 'react';

type TextInputProps = {
  label: string;
  background?: string;
  helperText?: string | null;
};

export const ControlledTextInput = ({ label, helperText }: TextInputProps) => {
  const formControlContext = useFormControlContext();

  if (formControlContext === undefined) {
    return null;
  }

  const {
    value,
    required,
    onChange,
    disabled,
    onFocus,
    onBlur,
    focused,
    filled,
    error,
  } = formControlContext;

  const shrinkLabel = filled || focused;

  return (
    <>
      <div className=" mx-2 my-3 rounded-3xl bg-stone-600 transition hover:bg-stone-500">
        <p
          className={`
          ${shrinkLabel ? 'translate-y-0 text-s' : 'translate-y-m text-l'} ${
            error ? 'text-red-600/70' : ''
          } ${
            focused ? 'text-primary-100' : ''
          } absolute translate-x-4 font-normal text-gray-300  transition-all`}
        >
          {label}
        </p>
        <input
          value={value as string}
          required={required}
          onChange={onChange}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full rounded-3xl border-none bg-transparent px-4 pb-2 pt-8 text-l font-normal text-white focus-visible:outline-none"
        />
      </div>
      <p
        className={`${
          !helperText ? 'hidden' : ''
        } absolute translate-y-[-20px] pl-5 text-s font-normal text-red-600/70`}
      >
        {helperText}
      </p>
    </>
  );
};

export const TextInput = ({
  label,
  helperText,
  ...props
}: TextInputProps & FormControlProps) => {
  return (
    <FormControl {...props}>
      <ControlledTextInput label={label} helperText={helperText} />
    </FormControl>
  );
};

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
        $background ? `background-color: ${$background};` : ''}

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

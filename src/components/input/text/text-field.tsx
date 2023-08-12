import { FormControl, type FormControlProps } from '@mui/base/FormControl';
import { Input } from '@mui/base/Input';
import React from 'react';
import Field from './field';

type InputProps = {
  label: string;
  background?: string;
  helperText?: string | null;
};

export type Props = {
  InputProps: InputProps;
} & FormControlProps;

export const TextField = ({ InputProps, ...props }: Props) => (
  <FormControl {...props}>
    {(formControlContext) => (
      <Field {...InputProps} {...formControlContext}>
        <Input
          slotProps={{
            input: {
              className:
                'w-full rounded-3xl border-none bg-transparent px-4 pb-2 pt-8 text-l font-normal text-white focus-visible:outline-none',
            },
          }}
        />
      </Field>
    )}
  </FormControl>
);

export default TextField;

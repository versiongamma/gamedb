import { useAutocomplete } from '@mui/base';
import { FormControl, FormControlProps } from '@mui/base/FormControl';

import Field from './field';
import { Props as TextInputProps } from './text-input';

export type Props = {
  value: string;
  onChange: (...event: any[]) => void;
  options: string[];
  className?: string;
  backgroundValueMap?: Record<string, string>;
  InputProps: TextInputProps['InputProps'];
  FormControlProps: FormControlProps;
};

const AutocompleteInput = ({
  value,
  onChange,
  options,
  className,
  backgroundValueMap,
  InputProps,
  FormControlProps,
}: Props) => {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    popupOpen,
    focused,
  } = useAutocomplete({
    options,
    value,
    onChange: (event, value) => {
      onChange({ ...event, target: { ...event.target, value: value ?? '' } });
    },
  });

  const { value: inputValue, ...inputProps } = getInputProps();

  return (
    <div
      {...getRootProps()}
      className={`w-auto ${!!className ? className : ''}`}
    >
      <FormControl value={inputValue} {...FormControlProps}>
        {({ value, onChange, ...formControlContext }) => (
          <Field {...InputProps} {...formControlContext} focused={focused}>
            <input
              value={value as string}
              onChange={onChange}
              {...inputProps}
              className="w-full rounded-3xl border-none bg-transparent px-4 pb-2 pt-8 text-l font-normal text-white focus-visible:outline-none"
            />
          </Field>
        )}
      </FormControl>

      <div
        className={`flex justify-center ${
          (!popupOpen || !groupedOptions.length) && 'hidden'
        }`}
      >
        <ul
          {...getListboxProps()}
          className="fixed z-50 m-2 max-h-[500px] w-[450px] overflow-y-auto rounded-xl bg-neutral-600 p-0 xs:w-[250px]"
        >
          {(groupedOptions as string[]).map((option, index) => {
            const backgroundColor =
              backgroundValueMap && backgroundValueMap[option];
            const colouredBackgroundStyle = backgroundColor ? 'hover:pl-7' : '';

            return (
              <li
                {...getOptionProps({ option, index })}
                key={option as string}
                className={`m-0 list-none px-5 py-2 transition-all hover:bg-neutral-500 ${colouredBackgroundStyle}`}
                style={{ backgroundColor }}
              >
                {option as string}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AutocompleteInput;

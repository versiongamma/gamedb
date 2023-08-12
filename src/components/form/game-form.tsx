import { GraphQLGame, Palette, Platform, Region } from '@/types';
import { Autocomplete } from '@mui/material';
import { styled } from 'goober';
import { useEffect, useState } from 'react';
import { Control, Controller, ControllerProps, useForm } from 'react-hook-form';
import Button from '../input/button';
import TextInput, { Props as TextInputProps } from '../input/text/text-input';
import Progress from '../progress';
import {
  EditFormErrorType,
  getFormInputValuesFromGame,
  validateEditFormData,
} from './get-values';
import { Form } from './layout';
import AutocompleteInput, {
  Props as AutocompleteInputProps,
} from '../input/text/autocomplete-input';

type StyledOptionProps = {
  $color: string;
};

const StyledOption = styled<StyledOptionProps>('span')`
  && {
    background-color: ${({ $color }) => $color};
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    justify-content: left;

    &:hover {
      background-color: ${({ $color }) => $color};
    }

    &.MuiAutocomplete-option[aria-selected='true'] {
      font-weight: 800;
      background-color: ${({ $color }) => $color};
      justify-content: right;
    }

    &.Mui-focused {
      padding-left: 2rem;
      background-color: ${({ $color }) => $color};
    }
  }
`;

type ControlledInputProps = {
  name: ControllerProps<GameFormData>['name'];
  control: Control<GameFormData, any>;
};

const ControlledTextInput = ({
  name,
  control,
  ...props
}: ControlledInputProps & TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className="m-3"
          {...props}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

const ControlledAutocompleteInput = ({
  name,
  control,
  ...props
}: ControlledInputProps &
  Omit<AutocompleteInputProps, 'value' | 'onChange'>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <AutocompleteInput
          className="m-3"
          {...props}
          value={value as string}
          onChange={onChange}
        />
      )}
    />
  );
};

export type GameFormData = {
  name: string;
  year: string;
  platform: Platform;
  art: string;
  color?: Palette;
  region: Region;
  variant: string;
};

type Props = {
  actionText: string;
  game?: GraphQLGame;
  onSubmit: (data: GameFormData) => Promise<void>;
  loading: boolean;
};

const GameForm = ({ actionText, game, onSubmit, loading }: Props) => {
  const [errors, setErrors] = useState<EditFormErrorType[]>([]);

  const defaultValues = getFormInputValuesFromGame(game);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<GameFormData>({
    defaultValues,
  });

  const colorWatch = watch('color');
  const { colorOptions, art } = game ?? {};

  // Input change callback event
  useEffect(() => {
    const subscription = watch((value) => {
      setErrors(validateEditFormData(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const nameErrors = errors
    .filter(({ input }) => input === 'name')
    .map(({ message }) => message);

  const yearErrors = errors
    .filter(({ input }) => input === 'year')
    .map(({ message }) => message);

  const platformErrors = errors
    .filter(({ input }) => input === 'platform')
    .map(({ message }) => message);

  const colorErrors = errors
    .filter(({ input }) => input === 'color')
    .map(({ message }) => message);

  const regionErrors = errors
    .filter(({ input }) => input === 'region')
    .map(({ message }) => message);

  const disableSave = !isDirty || !!errors.length;

  console.log(errors);

  return (
    <Form>
      <ControlledTextInput
        name="name"
        control={control}
        error={!!nameErrors.length}
        InputProps={{ label: 'Name', helperText: nameErrors.join(', ') }}
      />
      <ControlledTextInput
        name="year"
        control={control}
        error={!!yearErrors.length}
        InputProps={{ label: 'Year', helperText: yearErrors.join(', ') }}
      />
      <ControlledAutocompleteInput
        name="platform"
        control={control}
        options={Object.values(Platform)}
        FormControlProps={{ error: !!platformErrors.length }}
        InputProps={{
          label: 'Platform',
          helperText: platformErrors.join(', '),
        }}
      />
      <ControlledTextInput
        name="art"
        control={control}
        InputProps={{ label: 'Box Art (URL)' }}
      />
      {/** Input for selecting box art palette color */}
      {art && colorOptions && colorWatch && (
        <ControlledAutocompleteInput
          name="color"
          control={control}
          options={Object.values(Palette)}
          backgroundValueMap={colorOptions}
          FormControlProps={{ error: !!colorErrors.length }}
          InputProps={{
            label: 'Color',
            background: colorOptions[colorWatch],
            helperText: colorErrors.join(', '),
          }}
        />
      )}

      <ControlledAutocompleteInput
        name="region"
        control={control}
        options={Object.values(Region)}
        FormControlProps={{ error: !!regionErrors.length }}
        InputProps={{ label: 'Region', helperText: regionErrors.join(', ') }}
      />
      <ControlledTextInput
        name="variant"
        control={control}
        InputProps={{ label: 'Variant' }}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={disableSave || loading}
      >
        {loading ? <Progress size="1.5rem" /> : actionText}
      </Button>
    </Form>
  );
};

export default GameForm;

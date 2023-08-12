import { GraphQLGame, Palette, Platform, Region } from '@/types';
import { useEffect, useState } from 'react';
import { Control, Controller, ControllerProps, useForm } from 'react-hook-form';

import useHotkey from '@/hooks/use-hotkey';
import Button from '../input/button';
import AutocompleteInput, {
  Props as AutocompleteInputProps,
} from '../input/text/autocomplete-input';
import TextInput, { Props as TextInputProps } from '../input/text/text-input';
import {
  EditFormErrorType,
  getFormInputValuesFromGame,
  validateEditFormData,
} from './get-values';
import { Form } from './layout';

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

  const handleSave = () => {
    if (!disableSave) {
      handleSubmit(onSubmit)();
    }
  };

  useHotkey('Enter', handleSave);

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
      <Button onClick={handleSave} disabled={disableSave || loading}>
        {actionText}
      </Button>
    </Form>
  );
};

export default GameForm;

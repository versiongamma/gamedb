import { GraphQLGame, Palette, Platform, Region } from "@/types";
import { Autocomplete } from "@mui/material";
import { styled } from "goober";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../input/button";
import TextField from "../input/text-field";
import Progress from "../progress";
import {
  EditFormErrorType,
  getEditFormInputValuesFromGame,
  validateEditFormData,
} from "./get-values";
import { Form } from "./layout";

type StyledOptionProps = {
  $color: string;
};

const StyledOption = styled<StyledOptionProps>("span")`
  && {
    background-color: ${({ $color }) => $color};
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    justify-content: left;

    &:hover {
      background-color: ${({ $color }) => $color};
    }

    &.MuiAutocomplete-option[aria-selected="true"] {
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

export type EditGameFormData = {
  name: string;
  year: string;
  platform: Platform;
  art: string;
  color: Palette;
  region: Region;
  variant: string;
};

type Props = {
  actionText: string;
  game: GraphQLGame;
  onSubmit: (data: EditGameFormData) => Promise<void>;
  loading: boolean;
};

const EditGameForm = ({ actionText, game, onSubmit, loading }: Props) => {
  const [errors, setErrors] = useState<EditFormErrorType[]>([]);
  const defaultValues = getEditFormInputValuesFromGame(game);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<EditGameFormData>({
    defaultValues,
  });

  const colorWatch = watch("color");
  const { colorOptions } = game;

  // Input change callback event
  useEffect(() => {
    const subscription = watch((value) => {
      setErrors(validateEditFormData(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const nameErrors = errors
    .filter(({ input }) => input === "name")
    .map(({ message }) => message);

  const yearErrors = errors
    .filter(({ input }) => input === "year")
    .map(({ message }) => message);

  const platformErrors = errors
    .filter(({ input }) => input === "platform")
    .map(({ message }) => message);

  const artErrors = errors
    .filter(({ input }) => input === "art")
    .map(({ message }) => message);

  const colorErrors = errors
    .filter(({ input }) => input === "color")
    .map(({ message }) => message);

  const regionErrors = errors
    .filter(({ input }) => input === "color")
    .map(({ message }) => message);

  const disableSave = !isDirty || !!errors.length;

  return (
    <Form>
      <TextField
        variant="filled"
        label="Name"
        error={!!nameErrors.length}
        {...register("name")}
        helperText={nameErrors.join(", ")}
        fullWidth
      />
      <TextField
        variant="filled"
        label="Year"
        error={!!yearErrors.length}
        {...register("year")}
        helperText={yearErrors.join(", ")}
        fullWidth
      />
      <Controller
        name="platform"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={Object.values(Platform)}
            defaultValue={defaultValues.platform}
            onChange={(_event, data) => onChange(data)}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!platformErrors.length}
                variant="filled"
                label="Platform"
                value={value}
                helperText={platformErrors.join(", ")}
                fullWidth
              />
            )}
          />
        )}
      />
      <TextField
        variant="filled"
        label="Box Art (URL)"
        error={!!artErrors.length}
        {...register("art")}
        helperText={artErrors.join(", ")}
        fullWidth
      />

      {/** Input for selecting box art palette color */}
      <Controller
        name="color"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={Object.values(Palette)}
            defaultValue={defaultValues.color}
            onChange={(_event, data) => onChange(data)}
            disableClearable
            renderOption={(props, option) => (
              <StyledOption {...props} $color={colorOptions[option]}>
                {option}
              </StyledOption>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                value={value}
                label="Colour"
                variant="filled"
                error={!!colorErrors.length}
                helperText={colorErrors.join(", ")}
                fullWidth
                $background={colorOptions[colorWatch]}
              />
            )}
          />
        )}
      />
      <Controller
        name="region"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={Object.values(Region)}
            defaultValue={defaultValues?.region}
            onChange={(_event, data) => onChange(data)}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                value={value}
                label="Region"
                variant="filled"
                error={!!regionErrors.length}
                helperText={regionErrors.join(", ")}
                fullWidth
              />
            )}
          />
        )}
      />
      <TextField
        variant="filled"
        label="Variant"
        {...register("variant")}
        fullWidth
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

export default EditGameForm;

import { GraphQLGame, Palette, Platform, Region } from "@/types";
import { Autocomplete } from "@mui/material";
import { styled } from "goober";
import { useForm } from "react-hook-form";
import Button from "../input/button";
import TextField from "../input/text-field";
import { getEditFormInputValuesFromGame } from "./get-values";

const Form = styled("div")`
  display: flex;
  flex-direction: column;
  width: 500px;
  overflow-x: hidden;
`;

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
};

const EditGameForm = ({ actionText, game, onSubmit }: Props) => {
  const defaultValues = getEditFormInputValuesFromGame(game);
  const { register, handleSubmit, watch, setValue } = useForm<EditGameFormData>(
    {
      defaultValues,
    }
  );

  const colorWatch = watch("color");
  console.log(colorWatch);

  const { colorOptions } = game;

  const onColorAutocompleteChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: Palette | null
  ) => {
    if (value) {
      setValue("color", value);
    }
  };

  return (
    <Form>
      <TextField
        variant="filled"
        label="Name"
        {...register("name")}
        fullWidth
      />
      <TextField
        variant="filled"
        label="Year"
        {...register("year")}
        fullWidth
      />
      <Autocomplete
        options={Object.values(Platform)}
        defaultValue={defaultValues?.platform}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Platform"
            {...register("platform")}
            fullWidth
          />
        )}
      />
      <TextField
        variant="filled"
        label="Box Art (URL)"
        {...register("art")}
        fullWidth
      />
      {/** Input for selecting box art palette color */}
      <Autocomplete
        options={Object.values(Palette)}
        defaultValue={defaultValues?.color}
        onChange={onColorAutocompleteChange}
        renderOption={(props, option) => (
          <StyledOption {...props} $color={colorOptions[option]}>
            {option}
          </StyledOption>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register("color")}
            label="Colour"
            variant="filled"
            fullWidth
            $background={colorOptions[colorWatch]}
          />
        )}
      />
      <Autocomplete
        options={Object.values(Region)}
        defaultValue={defaultValues?.region}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register("region")}
            label="Region"
            variant="filled"
            fullWidth
          />
        )}
      />
      <TextField
        variant="filled"
        label="Variant"
        {...register("variant")}
        fullWidth
      />
      <Button onClick={handleSubmit(onSubmit)}>{actionText}</Button>
    </Form>
  );
};

export default EditGameForm;

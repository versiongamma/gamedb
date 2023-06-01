import { Platform, Region } from "@/types";
import { Autocomplete } from "@mui/material";
import { styled } from "goober";
import { useForm } from "react-hook-form";
import Button from "../input/button";
import TextField from "../input/text-field";

const Form = styled("div")`
  display: flex;
  flex-direction: column;
  width: 500px;
  overflow-x: hidden;
`;

export type GameFormData = {
  name: string;
  year: number;
  platform: Platform;
  art: string;
  region: Region;
  variant: string;
};

type Props = {
  actionText: string;
  defaultValues?: GameFormData;
  onSubmit: (data: GameFormData) => Promise<void>;
};

const GameForm = ({ actionText, defaultValues, onSubmit }: Props) => {
  const { register, handleSubmit, watch } = useForm<GameFormData>({
    defaultValues,
  });

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

export default GameForm;

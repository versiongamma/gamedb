import { Platform, Region } from "@/types";
import { Autocomplete, TextField } from "@mui/material";
import { styled } from "goober";
import { useForm } from "react-hook-form";
import Button from "../button";

const Form = styled("div")`
  display: flex;
  flex-direction: column;
  width: 500px;

  > * {
    margin: 0.3rem;
  }
`;

export type GameFormData = {
  name: string;
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
  const { register, handleSubmit } = useForm<GameFormData>({
    defaultValues,
  });

  return (
    <Form>
      <TextField variant="filled" label="Name" {...register("name")} />
      <Autocomplete
        options={Object.values(Platform)}
        defaultValue={defaultValues?.platform}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Platform"
            {...register("platform")}
          />
        )}
      />
      <TextField variant="filled" label="Box Art (URL)" {...register("art")} />
      <Autocomplete
        options={Object.values(Region)}
        defaultValue={defaultValues?.region}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register("region")}
            label="Region"
            variant="filled"
          />
        )}
      />
      <TextField variant="filled" label="Variant" {...register("variant")} />
      <Button onClick={handleSubmit(onSubmit)}>{actionText}</Button>
    </Form>
  );
};

export default GameForm;

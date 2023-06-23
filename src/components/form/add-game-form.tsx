import { Platform, Region } from "@/types";
import { Autocomplete } from "@mui/material";
import { styled } from "goober";
import { useForm } from "react-hook-form";
import Button from "../input/button";
import TextField from "../input/text-field";
import { Form } from "./layout";
import Progress from "../progress";

export type GameFormData = {
  name: string;
  year: string;
  platform: Platform;
  art: string;
  region: Region;
  variant: string;
};

type Props = {
  actionText: string;
  onSubmit: (data: GameFormData) => Promise<void>;
  loading: boolean;
};

const AddGameForm = ({ actionText, onSubmit, loading }: Props) => {
  const { register, handleSubmit } = useForm<GameFormData>();

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
      <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? <Progress size="1.5rem" /> : actionText}
      </Button>
    </Form>
  );
};

export default AddGameForm;

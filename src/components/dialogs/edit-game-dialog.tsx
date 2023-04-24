import { Game, WithId } from "@/types";
import { getFormInputValuesFromGame } from "@/utils/form";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";
import axios from "axios";

import GameForm, { GameFormData } from "../form/game-form";
import { StyledDialog, StyledDialogTitle } from "./layout";

type Props = {
  game: WithId<Game>;
  onClose: () => void;
  updateSingleGame: (game: WithId<Game>) => void;
};

const EditGameDialog = ({ game, onClose, updateSingleGame }: Props) => {
  const onSubmit = async (data: GameFormData) => {
    const result = await axios.post<WithId<Game>>("/api/edit-game", {
      id: game.id,
      gameData: data,
    });

    updateSingleGame(result.data);
    onClose();
  };
  return (
    <StyledDialog open>
      <StyledDialogTitle>
        {game.id}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <GameForm
          actionText="Save"
          onSubmit={onSubmit}
          defaultValues={getFormInputValuesFromGame(game)}
        />
      </DialogContent>
    </StyledDialog>
  );
};

export default EditGameDialog;

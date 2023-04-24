import { Game, WithId } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";
import axios from "axios";

import GameForm, { GameFormData } from "../form/game-form";
import { StyledDialog, StyledDialogTitle } from "./layout";

type Props = {
  open: boolean;
  onClose: () => void;
  addGame: (game: WithId<Game>) => void;
};

const AddGameDialog = ({ open, onClose, addGame }: Props) => {
  const onSubmit = async (data: GameFormData) => {
    const result = await axios.post<WithId<Game>>("/api/add-game", data);

    addGame(result.data);
    onClose();
  };
  return (
    <StyledDialog open={open}>
      <StyledDialogTitle>
        Add Game
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <GameForm actionText="Add Game" onSubmit={onSubmit} />
      </DialogContent>
    </StyledDialog>
  );
};

export default AddGameDialog;

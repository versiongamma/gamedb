import { Game, WithId } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";
import axios from "axios";

import GameForm, { GameFormData } from "../form/game-form";
import { StyledDialog, StyledDialogTitle } from "./layout";
import useGamesCache from "@/hooks/use-games-cache";

type Props = {
  open: boolean;
  onClose: () => void;
  collection: string;
};

const AddGameDialog = ({ open, onClose, collection }: Props) => {
  const { addGame } = useGamesCache(collection);
  const onSubmit = async (data: GameFormData) => {
    const result = await axios.post<Game>("/api/add-game", {
      data,
      collection,
    });

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

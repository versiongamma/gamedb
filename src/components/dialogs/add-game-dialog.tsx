import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";

import GameForm, { GameFormData } from "../form/game-form";
import { StyledDialog, StyledDialogTitle } from "./layout";
import useAddGameMutation from "./use-add-game-mutation";

type Props = {
  open: boolean;
  onClose: () => void;
  collection: string;
};

const AddGameDialog = ({ open, onClose, collection }: Props) => {
  const [addGame] = useAddGameMutation();
  const onSubmit = async (data: GameFormData) => {
    await addGame(data, collection);
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

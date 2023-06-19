import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";

import AddGameForm, { GameFormData } from "../form/add-game-form";
import { StyledDialog, StyledDialogTitle } from "./layout";

type Props = {
  open: boolean;
  onClose: () => void;
  FormElement: React.ReactNode;
};

const AddDialog = ({ open, onClose, FormElement }: Props) => {
  return (
    <StyledDialog open={open}>
      <StyledDialogTitle>
        Add Game
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>{FormElement}</DialogContent>
    </StyledDialog>
  );
};

export default AddDialog;

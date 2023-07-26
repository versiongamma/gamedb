import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';

import AddGameForm, { GameFormData } from '../form/add-game-form';
import { StyledDialog, StyledDialogTitle } from './layout';
import IconButton from '../input/icon-button';

type Props = {
  open: boolean;
  onClose: () => void;
  FormElement: React.ReactNode;
};

const AddDialog = ({ open, onClose, FormElement }: Props) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
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

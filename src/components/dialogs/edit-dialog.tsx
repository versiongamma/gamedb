import { GraphQLGame } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { DialogContent, LinearProgress } from '@mui/material';

import { useState } from 'react';
import Button from '../input/button';
import IconButton from '../input/icon-button';
import {
  StyledDialog,
  StyledDialogContents,
  StyledDialogTitle,
} from './layout';

type Props = {
  game: GraphQLGame;
  onClose: () => void;
  onDelete: () => Promise<void>;
  onMove: () => Promise<void>;
  loading: boolean;
  children: React.ReactNode;
};

const EditDialog = ({
  game,
  onClose,
  onDelete,
  onMove,
  loading,
  children,
}: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <StyledDialog open onClose={onClose}>
      <StyledDialogTitle>
        {game.id}
        <span>
          <IconButton onClick={onMove}>
            <SwapHorizontalCircleIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => setDeleteDialogOpen(true)}>
            <DeleteIcon color="secondary" />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </span>
      </StyledDialogTitle>
      <DialogContent>{children}</DialogContent>
      <StyledDialog open={deleteDialogOpen && !loading}>
        <StyledDialogContents>
          <p>Are you sure you want to delete this entry?</p>
          <span>
            <Button onClick={onDelete} disabled={loading}>
              Yes
            </Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>{' '}
          </span>
        </StyledDialogContents>
      </StyledDialog>
      {loading && <LinearProgress color="primary" />}
    </StyledDialog>
  );
};

export default EditDialog;

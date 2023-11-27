import { GraphQLGame } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, LinearProgress } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

import React from 'react';
import IconButton from '../input/icon-button';
import { StyledDialog, StyledDialogTitle } from './layout';
import useScreenResolution from '@/hooks/use-screen-resolution';

const Transition = React.forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'DialogSlideUpTransition';

type Props = {
  game: GraphQLGame;
  onClose: () => void;
  loading: boolean;
  children: React.ReactNode;
};

const NotesDialog = ({ game, onClose, loading, children }: Props) => {
  const { isMobileResolution } = useScreenResolution();
  const transition = isMobileResolution
    ? { TransitionComponent: Transition }
    : {};

  return (
    <StyledDialog open onClose={onClose} {...transition}>
      <StyledDialogTitle>
        {game.name}
        <span>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </span>
      </StyledDialogTitle>
      <DialogContent>{children}</DialogContent>
      {loading && <LinearProgress color="primary" />}
    </StyledDialog>
  );
};

export default NotesDialog;

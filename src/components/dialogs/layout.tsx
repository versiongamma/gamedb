import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { styled } from 'goober';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    max-width: 1000px;
    display: flex;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 900px) {
      font-size: 0.8rem;
    }
  }
`;

export const StyledDialogContents = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > span {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

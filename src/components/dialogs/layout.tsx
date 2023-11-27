import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { styled } from 'goober';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-container {
    @media screen and (max-width: 900px) {
      align-items: flex-end;
    }
  }

  .MuiPaper-root {
    max-width: 550px;
    display: flex;
    width: 80vw;

    @media screen and (max-width: 900px) {
      width: 100vw;
      height: 80vh;
      margin: 0;
    }
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

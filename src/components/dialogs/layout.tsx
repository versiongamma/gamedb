import { Dialog, DialogTitle } from "@mui/material";
import { styled } from "goober";

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    max-width: 1000px;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
`;

import { GraphQLGame } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogContent, IconButton } from "@mui/material";

import { useState } from "react";
import Button from "../input/button";
import {
  StyledDialog,
  StyledDialogContents,
  StyledDialogTitle,
} from "./layout";
import Progress from "../progress";

type Props = {
  game: GraphQLGame;
  onClose: () => void;
  onDelete: () => Promise<void>;
  deleteLoading: boolean;
  FormElement: React.ReactNode;
};

const EditDialog = ({
  game,
  onClose,
  onDelete,
  deleteLoading,
  FormElement,
}: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <StyledDialog open>
      <StyledDialogTitle>
        {game.id}
        <span>
          <IconButton onClick={() => setDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </span>
      </StyledDialogTitle>
      <DialogContent>{FormElement}</DialogContent>
      <StyledDialog open={deleteDialogOpen}>
        <StyledDialogContents>
          <p>Are you sure you want to delete this entry?</p>
          {deleteLoading ? (
            <Progress />
          ) : (
            <span>
              <Button onClick={onDelete} disabled={deleteLoading}>
                Yes
              </Button>
              <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>{" "}
            </span>
          )}
        </StyledDialogContents>
      </StyledDialog>
    </StyledDialog>
  );
};

export default EditDialog;

import { GraphQLGame } from "@/types";
import { getFormInputValuesFromGame } from "@/components/form/get-values";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogContent, IconButton } from "@mui/material";

import { useState } from "react";
import AddGameForm, { GameFormData } from "../form/add-game-form";
import Button from "../input/button";
import {
  StyledDialog,
  StyledDialogContents,
  StyledDialogTitle,
} from "./layout";

type Props = {
  game: GraphQLGame;
  onClose: () => void;
  onDelete: () => Promise<void>;
  FormElement: React.ReactNode;
};

const EditDialog = ({ game, onClose, onDelete, FormElement }: Props) => {
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
          <span>
            <Button onClick={onDelete}>Yes</Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          </span>
        </StyledDialogContents>
      </StyledDialog>
    </StyledDialog>
  );
};

export default EditDialog;

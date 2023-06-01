import { Game, WithId } from "@/types";
import { getFormInputValuesFromGame } from "@/utils/form";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogContent, IconButton } from "@mui/material";
import axios from "axios";

import GameForm, { GameFormData } from "../form/game-form";
import {
  StyledDialog,
  StyledDialogContents,
  StyledDialogTitle,
} from "./layout";
import { useState } from "react";
import Button from "../input/button";
import useGamesCache from "@/hooks/use-games-cache";

type Props = {
  game: Game;
  onClose: () => void;
  collection: string;
};

const EditGameDialog = ({ game, onClose, collection }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { updateSingleGame, removeGame } = useGamesCache(collection);

  const onSubmit = async (data: GameFormData) => {
    const result = await axios.post<Game>("/api/edit-game", {
      id: game.id,
      gameData: data,
      collection,
    });

    updateSingleGame(result.data);
    onClose();
  };

  const onDelete = async (id: string) => {
    await axios.post("/api/delete-game", {
      id: id,
      collection,
    });

    removeGame(id);
    onClose();
  };

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
      <DialogContent>
        <GameForm
          actionText="Save"
          onSubmit={onSubmit}
          defaultValues={getFormInputValuesFromGame(game)}
        />
      </DialogContent>
      <StyledDialog open={deleteDialogOpen}>
        <StyledDialogContents>
          <p>Are you sure you want to delete this entry?</p>
          <span>
            <Button onClick={() => onDelete(game.id)}>Yes</Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          </span>
        </StyledDialogContents>
      </StyledDialog>
    </StyledDialog>
  );
};

export default EditGameDialog;

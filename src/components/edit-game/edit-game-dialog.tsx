import { EditGameParameters } from "@/pages/api/edit-game";
import { Game, WithId } from "@/types";
import { getFormInputValuesFromGame, getGameFromFormInput } from "@/utils";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

import GameForm, { GameFormData } from "../form/game-form";

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    max-width: 1000px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  game: WithId<Game>;
  onClose: () => void;
  updateGamesCache: Dispatch<SetStateAction<WithId<Game>[]>>;
};

const EditGameDialog = ({ game, onClose, updateGamesCache }: Props) => {
  const updateCache = (game: WithId<Game>) => {
    updateGamesCache((memo) => {
      const withoutUpdated = memo.filter(({ id }) => id !== game.id);
      return [...withoutUpdated, game].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  };

  const onSubmit = async (data: GameFormData) => {
    await axios.post<EditGameParameters>("/api/edit-game", {
      id: game.id,
      gameData: data,
    });

    updateCache({ id: game.id, ...getGameFromFormInput(data) });
    onClose();
  };
  return (
    <StyledDialog open>
      <StyledDialogTitle>
        {game.id}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <GameForm
          actionText="Save"
          onSubmit={onSubmit}
          defaultValues={getFormInputValuesFromGame(game)}
        />
      </DialogContent>
    </StyledDialog>
  );
};

export default EditGameDialog;

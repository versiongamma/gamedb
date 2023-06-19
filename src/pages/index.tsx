import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "goober";
import Head from "next/head";
import { useState } from "react";

import AddDialog from "@/components/dialogs/add-dialog";
import EditDialog from "@/components/dialogs/edit-dialog";
import AddGameForm, { GameFormData } from "@/components/form/add-game-form";
import EditGameForm, {
  EditGameFormData,
} from "@/components/form/edit-game-form";
import ByPlatform from "@/components/views/games/by-platform";
import List from "@/components/views/games/list";
import useAddGameMutation from "@/components/views/games/use-add-game-mutation";
import useDeleteGameMutation from "@/components/views/games/use-delete-game-mutation";
import useUpdateGameMutation from "@/components/views/games/use-update-game-mutation";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/fetch-games";
import { GraphQLGame } from "@/types";
import Fab from "@/components/input/fab";

enum DisplayMethod {
  BY_PLATFORM,
  LIST,
}

type PageProps = {
  children: React.ReactNode;
  selectedGame: GraphQLGame | null;
  setSelectedGame: React.Dispatch<React.SetStateAction<GraphQLGame | null>>;
};

const Page = ({ children, selectedGame, setSelectedGame }: PageProps) => {
  const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);
  const [addGame] = useAddGameMutation();
  const [editGame] = useUpdateGameMutation();
  const [deleteGame] = useDeleteGameMutation();

  const onAddGameClose = () => setAddGameDialogOpen(false);
  const onEditGameClose = () => setSelectedGame(null);

  const onAddGameSubmit = async (data: GameFormData) => {
    await addGame(data);
    onAddGameClose();
  };

  const onEditGameSubmit = async (data: EditGameFormData) => {
    if (selectedGame) {
      await editGame({ id: selectedGame.id, gameData: data });
      onEditGameClose();
    }
  };

  const onDeleteGame = async () => {
    if (selectedGame) {
      await deleteGame({ id: selectedGame.id });
      onEditGameClose();
    }
  };

  return (
    <>
      {children}
      <Fab aria-label="add" onClick={() => setAddGameDialogOpen(true)}>
        <AddIcon />
      </Fab>
      {selectedGame && (
        <EditDialog
          game={selectedGame}
          onClose={onEditGameClose}
          onDelete={onDeleteGame}
          FormElement={
            <EditGameForm
              actionText="Save"
              game={selectedGame}
              onSubmit={onEditGameSubmit}
            />
          }
        />
      )}
      <AddDialog
        open={addGameDialogOpen}
        onClose={onAddGameClose}
        FormElement={
          <AddGameForm actionText="Add Game" onSubmit={onAddGameSubmit} />
        }
      />
    </>
  );
};

const Home = () => {
  const { data } = useQuery<FetchGamesResponse>(FETCH_GAMES, {
    variables: { collection: "games" },
  });
  const games = data?.FetchGames ?? [];

  const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  const [displayMethod, setDisplayMethod] = useState<DisplayMethod>(
    DisplayMethod.BY_PLATFORM
  );

  const handleGameClick = (game: GraphQLGame) => {
    setSelectedGame(game);
  };

  if (displayMethod === DisplayMethod.BY_PLATFORM) {
    return (
      <Page selectedGame={selectedGame} setSelectedGame={setSelectedGame}>
        <ByPlatform games={games} handleGameClick={handleGameClick} />
      </Page>
    );
  }

  if (displayMethod === DisplayMethod.LIST) {
    return (
      <Page selectedGame={selectedGame} setSelectedGame={setSelectedGame}>
        <List games={games} handleGameClick={handleGameClick} />
      </Page>
    );
  }

  return null;
};

export default Home;

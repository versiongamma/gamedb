import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import AddDialog from "@/components/dialogs/add-dialog";
import EditDialog from "@/components/dialogs/edit-dialog";
import AddGameForm, { GameFormData } from "@/components/form/add-game-form";
import EditGameForm, {
  EditGameFormData,
} from "@/components/form/edit-game-form";
import Fab from "@/components/input/fab";
import ByPlatform from "@/components/views/games/by-platform";
import List from "@/components/views/games/list";
import useAddGameMutation from "@/components/views/games/use-add-game-mutation";
import useDeleteGameMutation from "@/components/views/games/use-delete-game-mutation";
import useUpdateGameMutation from "@/components/views/games/use-edit-game-mutation";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/fetch-games";
import { GraphQLGame } from "@/types";
import Progress from "@/components/progress";
import { styled } from "goober";
import Head from "next/head";
import Header from "@/components/header";
import { PageWrapper } from "@/components/views/layout";

enum DisplayMethod {
  BY_PLATFORM,
  LIST,
}

type CollectionProps = {
  games: GraphQLGame[];
  handleGamesClick: (game: GraphQLGame) => void;
  displayMethod: DisplayMethod;
};

const Collection = ({
  games,
  handleGamesClick,
  displayMethod,
}: CollectionProps) => {
  if (displayMethod === DisplayMethod.BY_PLATFORM) {
    return <ByPlatform games={games} handleGameClick={handleGamesClick} />;
  }

  return null;
};

const Page = () => {
  const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);
  const [displayMethod, setDisplayMethod] = useState<DisplayMethod>(
    DisplayMethod.BY_PLATFORM
  );

  const { data, loading: loadingGames } =
    useQuery<FetchGamesResponse>(FETCH_GAMES);
  const games = data?.FetchGames ?? [];

  const [addGame] = useAddGameMutation();
  const [editGame, editGameResult] = useUpdateGameMutation();
  const { loading: editGameLoading } = editGameResult;
  const [deleteGame] = useDeleteGameMutation();

  const handleGameClick = (game: GraphQLGame) => {
    setSelectedGame(game);
  };

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

  if (loadingGames) {
    return <Progress size="5rem" />;
  }

  return (
    <>
      <Head>
        <title>GameDB</title>
      </Head>
      <Header />
      <PageWrapper>
        <Collection
          games={games}
          handleGamesClick={handleGameClick}
          displayMethod={displayMethod}
        />
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
                loading={editGameLoading}
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
      </PageWrapper>
    </>
  );
};

export default Page;

import AddIcon from "@mui/icons-material/Add";
import Head from "next/head";
import { useState } from "react";

import AddDialog from "@/components/dialogs/add-dialog";
import EditDialog from "@/components/dialogs/edit-dialog";
import AddGameForm, { GameFormData } from "@/components/form/add-game-form";
import EditGameForm, {
  EditGameFormData,
} from "@/components/form/edit-game-form";
import Header from "@/components/header";
import Fab from "@/components/input/fab";
import Progress from "@/components/progress";
import Collection from "@/components/views/collection";
import useAddGameMutation from "@/hooks/games/use-add-game-mutation";
import useDeleteGameMutation from "@/hooks/games/use-delete-game-mutation";
import useUpdateGameMutation from "@/hooks/games/use-edit-game-mutation";
import { PageLoadWrapper, PageWrapper } from "@/components/views/layout";
import useGames from "@/hooks/use-games";
import { GraphQLGame } from "@/types";

const Page = () => {
  const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);

  const [addGame, { loading: addGameLoading }] = useAddGameMutation();
  const [editGame, { loading: editGameLoading }] = useUpdateGameMutation();
  const [deleteGame, { loading: deleteGameLoading }] = useDeleteGameMutation();

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

  const { loading } = useGames();

  return (
    <>
      <Head>
        <title>GameDB</title>
      </Head>
      <Header />
      <PageWrapper>
        {loading ? (
          <PageLoadWrapper>
            <Progress size="5rem" />
          </PageLoadWrapper>
        ) : (
          <Collection handleGameClick={handleGameClick} />
        )}

        <Fab aria-label="add" onClick={() => setAddGameDialogOpen(true)}>
          <AddIcon />
        </Fab>
        {selectedGame && (
          <EditDialog
            game={selectedGame}
            onClose={onEditGameClose}
            onDelete={onDeleteGame}
            deleteLoading={deleteGameLoading}
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
            <AddGameForm
              actionText="Add Game"
              onSubmit={onAddGameSubmit}
              loading={addGameLoading}
            />
          }
        />
      </PageWrapper>
    </>
  );
};

export default Page;

import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';
import useAddGameMutation from '@/hooks/games/use-add-game-mutation';
import useDeleteGameMutation from '@/hooks/games/use-delete-game-mutation';
import useEditGameMutation from '@/hooks/games/use-edit-game-mutation';
import { PAGE_TO_LIST_MAP, Page } from '@/routes';
import { GraphQLGame } from '@/types';
import { getGamesByPlatform } from '@/utils/sort';
import { PLATFORMS_BY_YEAR } from '@/utils/types';
import AddDialog from './dialogs/add-dialog';
import EditDialog from './dialogs/edit-dialog';
import GameForm, { GameFormData } from './form/game-form';
import Fab from './input/fab';
import { PageLoadWrapper, PageWrapper } from './layout';
import Progress from './progress';
import PlatformDisplay from './views/platform-display';

type Props = {
  page: Page;
};

const Collection = ({ page }: Props) => {
  const list = PAGE_TO_LIST_MAP[page];
  const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);
  const { data, loading } = useQuery<FetchGamesResponse>(FETCH_GAMES, {
    variables: { list },
  });

  const games = [...(data?.FetchGames ?? [])];

  const [addGame, { loading: addGameLoading }] = useAddGameMutation();
  const [editGame, { loading: editGameLoading }] = useEditGameMutation();
  const [deleteGame, { loading: deleteGameLoading }] = useDeleteGameMutation();

  const handleGameClick = (game: GraphQLGame) => {
    setSelectedGame(game);
  };

  const onAddGameClose = () => setAddGameDialogOpen(false);
  const onEditGameClose = () => setSelectedGame(null);

  const onAddGameSubmit = async (data: GameFormData) => {
    await addGame({ gameData: data, list });
    onAddGameClose();
  };

  const onEditGameSubmit = async (data: GameFormData) => {
    if (selectedGame) {
      // TODO: fix this
      await editGame({ id: selectedGame.id, gameData: data as any, list });
      onEditGameClose();
    }
  };

  const onDeleteGame = async () => {
    if (selectedGame) {
      await deleteGame({ id: selectedGame.id, list });
      onEditGameClose();
    }
  };

  if (!games) {
    return null;
  }

  const gamesByPlatform = getGamesByPlatform(games);
  const shownPlatforms = Object.keys(gamesByPlatform);
  const platforms = PLATFORMS_BY_YEAR.filter((platform) =>
    shownPlatforms.includes(platform),
  );

  return (
    <>
      <PageWrapper>
        {loading ? (
          <PageLoadWrapper>
            <Progress size="5rem" />
          </PageLoadWrapper>
        ) : (
          platforms.map((platform) => (
            <PlatformDisplay
              key={platform}
              platform={platform}
              games={gamesByPlatform[platform]}
              handleGameClick={handleGameClick}
              list={list}
            />
          ))
        )}

        {selectedGame && (
          <EditDialog
            game={selectedGame}
            onClose={onEditGameClose}
            onDelete={onDeleteGame}
            deleteLoading={deleteGameLoading}
          >
            <GameForm
              actionText="Save"
              game={selectedGame}
              onSubmit={onEditGameSubmit}
              loading={editGameLoading}
            />
          </EditDialog>
        )}
        <AddDialog open={addGameDialogOpen} onClose={onAddGameClose}>
          <GameForm
            actionText="Add Game"
            onSubmit={onAddGameSubmit}
            loading={addGameLoading}
          />
        </AddDialog>
        <Fab
          addGameHandler={() => setAddGameDialogOpen(true)}
          activePage={page}
        />
      </PageWrapper>
    </>
  );
};

export default Collection;

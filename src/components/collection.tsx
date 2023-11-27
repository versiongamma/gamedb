import { useQuery } from '@apollo/client';
import { useState, useContext } from 'react';

import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';
import useAddGameMutation from '@/hooks/games/use-add-game-mutation';
import useDeleteGameMutation from '@/hooks/games/use-delete-game-mutation';
import useEditGameMutation from '@/hooks/games/use-edit-game-mutation';
import { List, PAGE_TO_LIST_MAP, Page } from '@/routes';
import { GraphQLGame } from '@/types';
import { getFilteredGames, getGamesByPlatform } from '@/utils/sort';
import { PLATFORMS_BY_YEAR } from '@/utils/types';
import AddDialog from './dialogs/add-dialog';
import EditDialog from './dialogs/edit-dialog';
import GameForm, { GameFormData } from './form/game-form';
import Fab from './input/fab';
import { PageLoadWrapper, PageWrapper } from './layout';
import Progress from './progress';
import PlatformDisplay from './views/platform-display';
import useMoveGameMutation from '@/hooks/games/use-move-game-mutation';
import useFilterStore from '@/hooks/use-filter-store';
import NotesDialog from './dialogs/notes-dialog';
import NotesForm from './form/notes-form';

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

  const filter = useFilterStore((store) => store.filter);

  const games = [...(data?.FetchGames ?? [])];

  const [addGame, { loading: addGameLoading }] = useAddGameMutation();
  const [editGame, { loading: editGameLoading }] = useEditGameMutation();
  const [deleteGame, { loading: deleteGameLoading }] = useDeleteGameMutation();
  const [moveGame, { loading: moveGameLoading }] = useMoveGameMutation();

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

  const otherList = list === List.Collection ? List.Wishlist : List.Collection;
  const onMoveGame = async () => {
    if (selectedGame) {
      await moveGame({
        id: selectedGame.id,
        fromList: list,
        toList: otherList,
      });
      onEditGameClose();
    }
  };

  if (!games) {
    return null;
  }

  const filteredGames = getFilteredGames(games, filter);
  const gamesByPlatform = getGamesByPlatform(filteredGames);
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
          // <EditDialog
          //   game={selectedGame}
          //   onClose={onEditGameClose}
          //   onDelete={onDeleteGame}
          //   onMove={onMoveGame}
          //   loading={editGameLoading || deleteGameLoading || moveGameLoading}
          // >
          //   <GameForm
          //     actionText="Save"
          //     game={selectedGame}
          //     onSubmit={onEditGameSubmit}
          //     loading={editGameLoading}
          //   />
          // </EditDialog>
          <NotesDialog
            game={selectedGame}
            onClose={onEditGameClose}
            loading={editGameLoading || deleteGameLoading || moveGameLoading}
          >
            <NotesForm />
          </NotesDialog>
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

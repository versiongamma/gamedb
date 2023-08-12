import { gql, useMutation } from '@apollo/client';
import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';
import { DeleteGameArguments } from '@/api/graphql/games/mutations';

const DELETE_GAME = gql`
  mutation DeleteGame($list: String!, $id: String!) {
    DeleteGame(list: $list, id: $id) {
      id
      success
    }
  }
`;

export type DeleteGameMutationResponse = {
  DeleteGame: {
    id: string;
    success: boolean;
  };
};

const useDeleteGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<DeleteGameMutationResponse>(DELETE_GAME);

  const deleteGame = async ({ list, id }: DeleteGameArguments) => {
    await mutationFunc({
      variables: { list, id },
      update: (cache, { data }) => {
        if (!data || !data.DeleteGame.success) {
          return;
        }

        const deletedGameId = data.DeleteGame.id;

        const { FetchGames: games } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
            variables: { list },
          }) ?? {};

        if (!games) {
          return;
        }

        cache.writeQuery({
          query: FETCH_GAMES,
          variables: { list },
          data: { FetchGames: games.filter(({ id }) => id !== deletedGameId) },
        });
      },
    });
  };

  return [deleteGame, mutationResult] as const;
};

export default useDeleteGameMutation;

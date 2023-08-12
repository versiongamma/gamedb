import { gql, useMutation } from '@apollo/client';
import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';
import {
  DeleteGameArguments,
  MoveGameArguments,
} from '@/api/graphql/games/mutations';
import { GraphQLGame } from '@/types';

const MOVE_GAME = gql`
  mutation MoveGame($id: String!, $fromList: String!, $toList: String!) {
    MoveGame(id: $id, fromList: $fromList, toList: $toList) {
      id
      name
      platform
      year
      art
      region
      color
      colorOptions {
        Vibrant
        Muted
        LightVibrant
        DarkVibrant
        LightMuted
        DarkMuted
      }
      variant
    }
  }
`;

export type MoveGameMutationResponse = {
  MoveGame: GraphQLGame;
};

const useMoveGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<MoveGameMutationResponse>(MOVE_GAME);

  const moveGame = async ({ id, fromList, toList }: MoveGameArguments) => {
    await mutationFunc({
      variables: { id, fromList, toList },
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        const movedGame = data.MoveGame;
        const { FetchGames: movedFromGamesList } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
            variables: { list: fromList },
          }) ?? {};

        const { FetchGames: movedToGamesList } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
            variables: { list: fromList },
          }) ?? {};

        if (!movedFromGamesList || !movedToGamesList) {
          return;
        }

        cache.writeQuery({
          query: FETCH_GAMES,
          variables: { list: toList },
          data: { FetchGames: [...movedToGamesList, movedGame] },
        });

        cache.writeQuery({
          query: FETCH_GAMES,
          variables: { list: fromList },
          data: {
            FetchGames: movedFromGamesList.filter((game) => game.id !== id),
          },
        });
      },
    });
  };

  return [moveGame, mutationResult] as const;
};

export default useMoveGameMutation;

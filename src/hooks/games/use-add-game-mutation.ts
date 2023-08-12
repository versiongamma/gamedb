import { GraphQLGame } from '@/types';
import { gql, useMutation } from '@apollo/client';

import { GameFormData } from '../../components/form/game-form';
import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';
import { AddGameArguments } from '@/api/graphql/games/mutations';

const ADD_GAME = gql`
  mutation AddGame($list: String!, $gameData: AddGameDataInput!) {
    AddGame(list: $list, gameData: $gameData) {
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

export type AddGameMutationResponse = {
  AddGame: GraphQLGame;
};

const useAddGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<AddGameMutationResponse>(ADD_GAME);

  const addGame = async ({ list, gameData }: AddGameArguments) => {
    await mutationFunc({
      variables: { gameData, list },
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        const newGame = data.AddGame;
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
          data: { FetchGames: [...games, newGame] },
        });
      },
    });
  };

  return [addGame, mutationResult] as const;
};

export default useAddGameMutation;

import { GraphQLGame } from "@/types";
import { gql, useMutation } from "@apollo/client";

import { GameFormData } from "../../form/add-game-form";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/fetch-games";

const ADD_GAME = gql`
  mutation AddGame($gameData: AddGameData!) {
    AddGame(gameData: $gameData) {
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

  const addGame = async (gameData: GameFormData) => {
    await mutationFunc({
      variables: { gameData },
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        const newGame = data.AddGame;
        const { FetchGames: games } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
          }) ?? {};

        if (!games) {
          return;
        }

        cache.writeQuery({
          query: FETCH_GAMES,
          data: { FetchGames: [...games, newGame] },
        });
      },
    });
  };

  return [addGame, mutationResult] as const;
};

export default useAddGameMutation;

import { GraphQLGame } from "@/types";
import { gql, useMutation } from "@apollo/client";

import { GameFormData } from "../form/game-form";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/types/fetch-games";

const ADD_GAME = gql`
  mutation AddGame($gameData: GameData!, $collection: String!) {
    AddGame(gameData: $gameData, collection: $collection) {
      id
      name
      platform
      year
      art
      region
      color
      variant
    }
  }
`;

export type AddGameMutationResponse = {
  UpdateGame: GraphQLGame;
};

const useAddGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<AddGameMutationResponse>(ADD_GAME);

  const addGame = async (gameData: GameFormData, collection: string) => {
    await mutationFunc({
      variables: { gameData, collection },
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        const newGame = data.UpdateGame;

        console.log(newGame);

        const { FetchGames: games } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
          }) ?? {};

        if (!games) {
          return;
        }

        console.log(games);

        cache.writeQuery({
          query: FETCH_GAMES,
          data: { FetchGames: [...games, newGame] },
        });
      },
    });
  };

  return [addGame];
};

export default useAddGameMutation;

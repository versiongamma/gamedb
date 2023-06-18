import { GraphQLGame } from "@/types";
import { gql, useMutation } from "@apollo/client";

import { GameFormData } from "../form/game-form";

const UPDATE_GAME = gql`
  mutation EditGame($id: String!, $gameData: GameData!, $collection: String!) {
    EditGame(id: $id, gameData: $gameData, collection: $collection) {
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

export type UpdateGameMutationResponse = {
  UpdateGame: GraphQLGame;
};

const useUpdateGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<UpdateGameMutationResponse>(UPDATE_GAME);

  const updateGame = async (
    id: string,
    gameData: GameFormData,
    collection: string
  ) => {
    await mutationFunc({
      variables: { id, gameData, collection },
    });
  };

  return [updateGame];
};

export default useUpdateGameMutation;

import { GraphQLGame } from "@/types";
import { gql, useMutation } from "@apollo/client";

import { EditGameArguments } from "@/api/graphql/games/mutations";

const EDIT_GAME = gql`
  mutation EditGame($id: String!, $gameData: EditGameDataInput!) {
    EditGame(id: $id, gameData: $gameData) {
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
      indexInPlatform
    }
  }
`;

export type EditGameMutationResponse = {
  EditGame: GraphQLGame;
};

const useUpdateGameMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<EditGameMutationResponse>(EDIT_GAME);

  const editGame = async (variables: EditGameArguments) => {
    await mutationFunc({
      variables,
    });
  };

  return [editGame, mutationResult] as const;
};

export default useUpdateGameMutation;

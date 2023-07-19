import { gql, useMutation } from "@apollo/client";

import { UpdateGameOrderArguments } from "@/api/graphql/games/mutations";

const UPDATE_GAME_ORDER = gql`
  mutation UPDATE_GAME_ORDER($order: [GameOrderInput!]!) {
    UpdateGameOrder(order: $order) {
      order {
        id
        indexInPlatform
      }
    }
  }
`;

export type UpdateGameOrderMutationResponse = {
  UpdateGameOrder: {
    order: {
      id: string;
      indexInPlatform: number;
    }[];
  };
};

const useUpdateGameOrderMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<UpdateGameOrderMutationResponse>(UPDATE_GAME_ORDER);

  const updateGameOrder = async (variables: UpdateGameOrderArguments) => {
    await mutationFunc({
      variables,
    });
  };

  return [updateGameOrder, mutationResult] as const;
};

export default useUpdateGameOrderMutation;

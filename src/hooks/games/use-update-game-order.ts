import { gql, useMutation } from '@apollo/client';

import { UpdateGameOrderArguments } from '@/api/graphql/games/mutations';
import { FETCH_GAMES, FetchGamesResponse } from '@/graphql/fetch-games';

const UPDATE_GAME_ORDER = gql`
  mutation UPDATE_GAME_ORDER($list: String!, $order: [GameOrderInput!]!) {
    UpdateGameOrder(list: $list, order: $order) {
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

const useUpdateGameOrderMutation = (list: string) => {
  const [mutationFunc, mutationResult] =
    useMutation<UpdateGameOrderMutationResponse>(UPDATE_GAME_ORDER);

  const updateGameOrder = async (variables: UpdateGameOrderArguments) => {
    await mutationFunc({
      variables,
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        const newOrder = data.UpdateGameOrder.order;
        const { FetchGames: games } =
          cache.readQuery<FetchGamesResponse>({
            query: FETCH_GAMES,
            variables: { list },
          }) ?? {};

        if (!games) {
          return;
        }

        const updatedGamesData = games.map((game) => {
          const orderData = newOrder.find(({ id }) => game.id === id);
          if (!orderData) {
            return game;
          }

          return { ...game, indexInPlatform: orderData.indexInPlatform };
        });

        cache.writeQuery({
          query: FETCH_GAMES,
          variables: { list },
          data: { FetchGames: updatedGamesData },
        });
      },
    });
  };

  return [updateGameOrder, mutationResult] as const;
};

export default useUpdateGameOrderMutation;

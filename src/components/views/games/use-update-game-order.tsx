import { GraphQLGame } from "@/types";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import {
  FETCH_GAMES,
  FetchGamesResponse,
  gameFields,
} from "@/graphql/fetch-games";

const UPDATE_GAME_ORDER = gql`
  mutation UPDATE_GAME_ORDER($order: [GameOrderInput!]!) {
    UpdateGameOrder(order: $order) {
      order {
        id
        index
      }
    }
  }
`;

export type UpdateGameOrderMutationResponse = {
  UpdateGameOrder: {
    order: {
      id: string;
      index: number;
    }[];
  };
};

const useUpdateGameOrderMutation = () => {
  const [mutationFunc, mutationResult] =
    useMutation<UpdateGameOrderMutationResponse>(UPDATE_GAME_ORDER);
  const [fetchGames] = useLazyQuery<FetchGamesResponse>(FETCH_GAMES);

  const updateGameOrder = async (
    ids: string[],
    fromIndex: number,
    toIndex: number
  ) => {
    // if (fromIndex === toIndex) {
    //   return;
    // }

    const games = (await fetchGames({ fetchPolicy: "cache-only" })).data
      ?.FetchGames;

    if (!games) {
      return;
    }

    const updatedGames = games
      .filter(({ id }) => ids.includes(id))
      .sort((a, b) => (a.indexInPlatform ?? 0) - (b.indexInPlatform ?? 0));

    const element = updatedGames[fromIndex];
    const newGames = [...updatedGames];
    newGames.splice(fromIndex, 1);
    newGames.splice(toIndex, 0, element);

    const order = newGames.map(({ id }, index) => ({
      id,
      index,
    }));

    await mutationFunc({
      variables: { order },
      update: (cache) => {
        newGames.forEach((game, index) => {
          cache.writeFragment<GraphQLGame>({
            id: `Game:${game.id}`,
            fragment: gameFields,
            data: { ...game, indexInPlatform: index },
          });
        });
      },
    });
  };

  return [updateGameOrder, mutationResult] as const;
};

export default useUpdateGameOrderMutation;

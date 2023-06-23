import { DeleteGameMutationResponse } from "@/components/views/games/use-delete-game-mutation";
import {
  AddGameArguments,
  DeleteGameArguments,
  EditGameArguments,
  addGame,
  deleteGame,
  editGame,
  fetchGames,
} from "@/api/graphql/games";
import { fetchWishlist } from "@/api/graphql/wishlist";
import { Game } from "@/types";

const resolvers = {
  Query: {
    FetchGames: () => fetchGames(),
    FetchWishlist: () => fetchWishlist(),
  },

  Mutation: {
    EditGame: (_parent: Game, args: EditGameArguments) => editGame(args),
    AddGame: (_parent: Game, args: AddGameArguments) => addGame(args),
    DeleteGame: (
      _parent: DeleteGameMutationResponse,
      args: DeleteGameArguments
    ) => deleteGame(args),
  },
};

export default resolvers;

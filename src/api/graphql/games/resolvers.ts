import { DeleteGameMutationResponse } from "@/components/views/games/use-delete-game-mutation";
import {
  AddGameArguments,
  DeleteGameArguments,
  EditGameArguments,
  UpdateGameOrderArguments,
  addGame,
  deleteGame,
  editGame,
  updateGameOrder,
} from "./mutations";
import { fetchGames } from "./queries";
import { fetchWishlist } from "@/api/graphql/wishlist";
import { Game } from "@/types";

const Query = {
  FetchGames: () => fetchGames(),
  FetchWishlist: () => fetchWishlist(),
};

const Mutation = {
  EditGame: (_parent: Game, args: EditGameArguments) => editGame(args),
  AddGame: (_parent: Game, args: AddGameArguments) => addGame(args),
  DeleteGame: (
    _parent: DeleteGameMutationResponse,
    args: DeleteGameArguments
  ) => deleteGame(args),
  UpdateGameOrder: (_parent: boolean, args: UpdateGameOrderArguments) =>
    updateGameOrder(args),
};

export default {
  Query,
  Mutation,
};

import {
  AddGameArguments,
  DeleteGameArguments,
  EditGameArguments,
  MoveGameArguments,
  UpdateGameOrderArguments,
  addGame,
  deleteGame,
  editGame,
  moveGame,
  updateGameOrder,
} from './mutations';
import { FetchGamesArgs, fetchGames } from './queries';
import { Game } from '@/types';

const Query = {
  FetchGames: (_parent: Game, args: FetchGamesArgs) => fetchGames(args),
};

const Mutation = {
  EditGame: (_parent: Game, args: EditGameArguments) => editGame(args),
  AddGame: (_parent: Game, args: AddGameArguments) => addGame(args),
  DeleteGame: (_parent: unknown, args: DeleteGameArguments) => deleteGame(args),
  UpdateGameOrder: (_parent: unknown, args: UpdateGameOrderArguments) =>
    updateGameOrder(args),
  MoveGame: (_parent: Game, args: MoveGameArguments) => moveGame(args),
};

export default {
  Query,
  Mutation,
};

import { Game } from "@/types";
import { getColorFromUrl } from "@/utils/color";
import { GameFormData } from "@/components/form/game-form";
import db from "../primitives/db";

type GameWithoutId = Omit<Game, "id">;

export type FetchGamesArguments = {
  collection: string;
};

export const fetchGames = async (
  args: FetchGamesArguments
): Promise<Game[]> => {
  const { collection } = args;
  const response = await db.collection(collection).get();
  const games = response.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Omit<Game, "id">),
  }));

  return games;
};

export type FetchGamesByPlatformResponse = {
  [key: string]: Game[];
};

export const fetchGamesByPlatform =
  async (): Promise<FetchGamesByPlatformResponse> => {
    const response = await db.collection("games").get();
    const games = response.docs.map((entry) => entry.data() as Game);

    const gamesByPlatform = games.reduce<FetchGamesByPlatformResponse>(
      (memo, game) => {
        if (Object.keys(memo).includes(game.platform)) {
          memo[game.platform].push(game);
          return memo;
        }

        memo[game.platform] = [game];
        return memo;
      },
      {}
    );

    return gamesByPlatform;
  };

export type AddGameArguments = {
  gameData: GameFormData;
  collection: string;
};

export const addGame = async (args: AddGameArguments): Promise<Game> => {
  const { gameData, collection } = args;

  const artDominantColor = gameData.art
    ? await getColorFromUrl(gameData.art)
    : undefined;

  const game: GameWithoutId = {
    ...gameData,
    color: artDominantColor ?? "#000000",
  };

  const result = await db.collection(collection).add(game);
  const snapshot = await result.get();
  const id = snapshot.id;
  return { id, ...(snapshot.data() as GameWithoutId) };
};

export type EditGameArguments = {
  id: string;
  gameData: GameFormData;
  collection: string;
};

export const editGame = async (args: EditGameArguments): Promise<Game> => {
  const { id, gameData, collection } = args;

  const artDominantColor = gameData.art
    ? await getColorFromUrl(gameData.art)
    : undefined;

  const updatedGame: Game = {
    id,
    ...gameData,
    color: artDominantColor ?? "#000000",
  };

  await db.collection(collection).doc(id).update(updatedGame);
  return { ...updatedGame };
};

export const deleteGame = async (id: string, collection: string) => {
  await db.collection(collection).doc(id).delete();
};

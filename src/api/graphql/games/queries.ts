import db from "@/api/primitives/db";
import { Game } from "@/types";

const DEFAULT_GAME_COLLECTION_PATH = "games";
const { GAME_COLLECTION_PATH = DEFAULT_GAME_COLLECTION_PATH } = process.env;

export const fetchGames = async (): Promise<Game[]> => {
  const response = await db.collection(GAME_COLLECTION_PATH).get();
  const games = response.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Omit<Game, "id">),
  }));

  return games;
};

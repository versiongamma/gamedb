import { Game } from "@/types";

import db from "../db";

export const fetchGames = async (): Promise<Game[]> => {
  const response = await db.collection("games").get();
  const games = response.docs.map((entry) => entry.data() as Game);

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

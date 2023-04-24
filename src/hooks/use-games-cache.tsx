import { Game, Platform, WithId } from "@/types";
import { PLATFORMS_BY_YEAR } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const sortGameFn = (a: Game, b: Game) => a.name.localeCompare(b.name);

const useGamesCache = () => {
  const [games, setGames] = useState<WithId<Game>[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await axios.get<WithId<Game>[]>("/api/fetch-games");
      updateGames(response.data);
    };

    get().catch((error) => console.log(error));
  }, []);

  const updateSingleGame = (game: WithId<Game>) => {
    const withoutUpdated = games.filter(({ id }) => id !== game.id);
    updateGames([...withoutUpdated, game]);
  };

  const updateGames = (games: WithId<Game>[]) => {
    const sortedGames = PLATFORMS_BY_YEAR.reduce<WithId<Game>[]>(
      (memo, platform) => {
        games
          .filter((game) => game.platform === platform)
          .sort(sortGameFn)
          .forEach((game) => {
            memo.push(game);
          });

        return memo;
      },
      []
    );

    setGames(sortedGames);
  };

  const addGame = (game: WithId<Game>) => {
    updateGames([...games, game]);
  };

  return { games, updateSingleGame, updateGames, addGame };
};

export default useGamesCache;

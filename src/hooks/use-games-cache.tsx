import { Game } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useGamesCache = (collection: string) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await axios.post<Game[]>("/api/fetch-games", {
        collection,
      });
      setGames(response.data);
    };

    get().catch((error) => console.log(error));
  }, [collection]);

  const updateSingleGame = (game: Game) => {
    const withoutUpdated = games.filter(({ id }) => id !== game.id);
    setGames([...withoutUpdated, game]);
  };

  const addGame = (game: Game) => {
    setGames([...games, game]);
  };

  const removeGame = (id: string) => {
    setGames(games.filter((game) => game.id !== id));
  };

  return { games, updateSingleGame, addGame, removeGame };
};

export default useGamesCache;

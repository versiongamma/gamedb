import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/fetch-games";
import { useQuery } from "@apollo/client";

const useGames = () => {
  const { data, loading } = useQuery<FetchGamesResponse>(FETCH_GAMES);
  return { games: data?.FetchGames, loading };
};

export default useGames;

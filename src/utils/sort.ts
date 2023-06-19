import { Game, GraphQLGame, GraphQLWishlistItem, Platform } from "@/types";

const getItemsByPlatform = <T extends { platform: Platform }>(games: T[]) =>
  games.reduce<{ [key: string]: T[] }>((memo, game) => {
    if (Object.keys(memo).includes(game.platform)) {
      memo[game.platform].push(game);
      return memo;
    }

    memo[game.platform] = [game];
    return memo;
  }, {});

const sortItemsByYear = <T extends { year: number }>(a: T, b: T) =>
  a.year - b.year;
const sortItemsByName = <T extends { name: string }>(a: T, b: T) =>
  a.name.localeCompare(b.name);

export const sortGamesByYearThenName = (a: Game, b: Game) => {
  const byYearSortValue = sortItemsByYear(a, b);
  if (byYearSortValue === 0) {
    return sortItemsByName(a, b);
  }
  return byYearSortValue;
};

export const getGamesByPlatform = (games: GraphQLGame[]) => {
  const sortedGames = games.sort(sortGamesByYearThenName);
  return getItemsByPlatform(sortedGames);
};

export const getSortedWishlistItems = (games: GraphQLWishlistItem[]) => {
  const sortedWishlistItems = games.sort(sortItemsByName);
  return getItemsByPlatform(sortedWishlistItems);
};

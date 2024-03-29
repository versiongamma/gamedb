import { Game, GraphQLGame, Platform } from '@/types';

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

export const getFilteredGames = (games: GraphQLGame[], filter: string) => {
  const filterTerms = filter.split(' ');
  return games.filter(({ name }) =>
    filterTerms.every((term) =>
      name.toLowerCase().includes(term.toLowerCase()),
    ),
  );
};

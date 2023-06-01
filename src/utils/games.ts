import { Game } from "@/types";

export const sortGamesByYear = (a: Game, b: Game) => a.year - b.year;
export const sortGamesByName = (a: Game, b: Game) =>
  a.name.localeCompare(b.name);

export const sortGamesByYearThenName = (a: Game, b: Game) => {
  const byYearSortValue = sortGamesByName(a, b);
  if (byYearSortValue === 0) {
    return sortGamesByName(a, b);
  }
  return byYearSortValue;
};

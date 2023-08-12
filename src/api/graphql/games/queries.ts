import db from '@/api/primitives/db';
import { Game } from '@/types';

export type FetchGamesArgs = {
  list: string;
};

export const fetchGames = async ({ list }: FetchGamesArgs): Promise<Game[]> => {
  const response = await db.collection(list).get();
  const games = response.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Omit<Game, 'id'>),
  }));

  return games;
};

import { fetchGames } from "@/primitives/games/queries";
import { Game } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  _req: NextApiRequest,
  response: NextApiResponse<Game[]>
) => {
  const games = await fetchGames();
  response.status(200).json(games);
};

export default handler;

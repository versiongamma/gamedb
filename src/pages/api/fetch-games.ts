import { fetchGames } from "@/primitives/games/queries";
import { Game } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Game[] | string>
) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(403).json("Access Denied");
    return;
  }

  const games = await fetchGames();
  response.status(200).json(games);
};

export default handler;

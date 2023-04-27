import { fetchGames } from "@/primitives/games/queries";
import { Game, Override } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

type Request = Override<NextApiRequest, { body: { collection: string } }>;

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Game[] | string>
) => {
  const session = await getServerSession(request, response, authOptions);

  const { collection } = request.body;

  if (!session) {
    response.status(403).json("Access Denied");
    return;
  }

  const games = await fetchGames(collection);
  response.status(200).json(games);
};

export default handler;

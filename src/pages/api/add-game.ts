import { GameFormData } from "@/components/form/game-form";
import { addGame } from "@/primitives/games/mutations";
import { Game, Override, WithId } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

export type AddGameParameters = GameFormData;
type Request = Override<NextApiRequest, { body: AddGameParameters }>;

const handler = async (
  request: Request,
  response: NextApiResponse<WithId<Game> | string>
) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(403).json("Access Denied");
    return;
  }

  const gameData = request.body;
  try {
    const newGame = await addGame(gameData);
    response.status(200).json(newGame);
  } catch (error) {
    console.log("Error when adding game: ", error);
    response.status(500).json("Internal Server Error");
  }
};

export default handler;

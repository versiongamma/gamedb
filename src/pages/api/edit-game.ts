import { GameFormData } from "@/components/form/game-form";
import { editGame } from "@/primitives/games/mutations";
import { Game, Override, WithId } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

export type EditGameParameters = {
  id: string;
  gameData: GameFormData;
  collection: string;
};
type Request = Override<NextApiRequest, { body: EditGameParameters }>;

const handler = async (
  request: Request,
  response: NextApiResponse<WithId<Game> | string>
) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(403).json("Access Denied");
    return;
  }

  const { id, gameData, collection } = request.body;

  try {
    const updatedGame = await editGame(id, gameData, collection);
    response.status(200).json(updatedGame);
  } catch (error) {
    console.log("Error when editing game: ", error);
    response.status(500);
  }
};

export default handler;

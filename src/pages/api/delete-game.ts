import { GameFormData } from "@/components/form/game-form";
import { addGame, deleteGame } from "@/primitives/games/mutations";
import { Game, Override, WithId } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

export type DeleteGameParameters = { id: string; collection: string };
type Request = Override<NextApiRequest, { body: DeleteGameParameters }>;

const handler = async (request: Request, response: NextApiResponse<string>) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(403).json("Access Denied");
    return;
  }

  const { id, collection } = request.body;
  try {
    const newGame = await deleteGame(id, collection);
    response.status(200).json(`${id} deleted successfully`);
  } catch (error) {
    console.log("Error when adding game: ", error);
    response.status(500).json("Internal Server Error");
  }
};

export default handler;

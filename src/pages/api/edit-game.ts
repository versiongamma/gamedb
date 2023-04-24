import { GameFormData } from "@/components/form/game-form";
import { editGame } from "@/primitives/games/mutations";
import { Game, Override, WithId } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export type EditGameParameters = {
  id: string;
  gameData: GameFormData;
};
type Request = Override<NextApiRequest, { body: EditGameParameters }>;

const handler = async (
  request: Request,
  response: NextApiResponse<WithId<Game>>
) => {
  const { id, gameData } = request.body;

  try {
    const updatedGame = await editGame(id, gameData);
    response.status(200).json(updatedGame);
  } catch (error) {
    console.log("Error when editing game: ", error);
    response.status(500);
  }
};

export default handler;

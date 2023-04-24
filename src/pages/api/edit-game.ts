import { GameFormData } from "@/components/form/game-form";
import { editGame } from "@/primitives/games/mutations";
import { Game, Override, WithId } from "@/types";
import { getGameFromFormInput } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export type EditGameParameters = {
  id: string;
  gameData: GameFormData;
};
type Request = Override<NextApiRequest, { body: EditGameParameters }>;

const handler = async (request: Request, response: NextApiResponse<string>) => {
  const { id, gameData } = request.body;
  const updatedGameData = { ...getGameFromFormInput(gameData) };

  try {
    await editGame(id, updatedGameData);
    response.status(200).json("Game updated successfully");
  } catch (error) {
    console.log("Error when editing game: ", error);
    response.status(500);
  }
};

export default handler;

import { GameFormData } from "@/components/form/game-form";
import { addGame } from "@/primitives/games/mutations";
import { Override } from "@/types";
import { getGameFromFormInput } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export type AddGameParameters = GameFormData;
type Request = Override<NextApiRequest, { body: AddGameParameters }>;

const handler = async (request: Request, response: NextApiResponse<string>) => {
  const parameters = request.body;

  const newGame = getGameFromFormInput(parameters);

  try {
    await addGame(newGame);
    response.status(200).json("Game created successfully");
  } catch (error) {
    console.log("Error when adding game: ", error);
    response.status(500);
  }
};

export default handler;

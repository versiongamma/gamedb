import { addGame } from "@/primitives/games/mutations";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<string>
) => {
  const newGame = request.body;
  addGame(newGame);
  response.status(200).json("Game created successfully");
};

export default handler;

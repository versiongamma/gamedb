import { Game } from "@/types";
import db from "../db";

export const addGame = async (game: Game) => {
  await db.collection("games").add(game);
};

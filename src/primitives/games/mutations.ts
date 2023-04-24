import { Game, WithId } from "@/types";
import db from "../db";

export const addGame = async (game: Game) => {
  await db.collection("games").add(game);
};

export const editGame = async (id: string, gameData: Game) => {
  await db.collection("games").doc(id).update(gameData);
};

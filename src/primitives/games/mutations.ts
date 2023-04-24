import { Game, WithId } from "@/types";
import db from "../db";
import { getColorFromUrl } from "@/utils/color";
import { GameFormData } from "@/components/form/game-form";

export const addGame = async (
  gameData: GameFormData
): Promise<WithId<Game>> => {
  const artDominantColor = await getColorFromUrl(gameData.art);

  const game: Game = {
    ...gameData,
    color: artDominantColor ?? "#ffffff",
  };

  const result = await db.collection("games").add(game);
  return (await result.get()).data() as WithId<Game>;
};

export const editGame = async (
  id: string,
  gameData: GameFormData
): Promise<WithId<Game>> => {
  const artDominantColor = await getColorFromUrl(gameData.art);

  const updatedGame: Game = {
    ...gameData,
    color: artDominantColor ?? "#ffffff",
  };

  await db.collection("games").doc(id).update(updatedGame);
  return { id, ...updatedGame };
};

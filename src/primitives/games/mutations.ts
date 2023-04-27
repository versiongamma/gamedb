import { Game, WithId } from "@/types";
import db from "../db";
import { getColorFromUrl } from "@/utils/color";
import { GameFormData } from "@/components/form/game-form";

export const addGame = async (
  gameData: GameFormData,
  collection: string
): Promise<WithId<Game>> => {
  const artDominantColor = gameData.art
    ? await getColorFromUrl(gameData.art)
    : undefined;

  const game: Game = {
    ...gameData,
    color: artDominantColor ?? "#000000",
  };

  const result = await db.collection(collection).add(game);
  return (await result.get()).data() as WithId<Game>;
};

export const editGame = async (
  id: string,
  gameData: GameFormData,
  collection: string
): Promise<WithId<Game>> => {
  const artDominantColor = gameData.art
    ? await getColorFromUrl(gameData.art)
    : undefined;

  const updatedGame: Game = {
    ...gameData,
    color: artDominantColor ?? "#000000",
  };

  await db.collection(collection).doc(id).update(updatedGame);
  return { id, ...updatedGame };
};

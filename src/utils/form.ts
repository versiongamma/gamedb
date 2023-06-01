import { GameFormData } from "@/components/form/game-form";
import { Game, WithId } from "@/types";

export const getFormInputValuesFromGame = (game: Game): GameFormData => {
  const { id, ...gameWithoutId } = game;
  return {
    ...gameWithoutId,
    variant: !!game.variant ? game.variant : "",
    art: game.art ?? "",
  };
};

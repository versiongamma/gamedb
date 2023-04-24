import { GameFormData } from "@/components/form/game-form";
import { AddGameParameters } from "@/pages/api/add-game";
import { Game, Region, WithId } from "@/types";

export const REGION_LABEL_MAP: Record<Region, string> = {
  [Region.AUNZ]: "Australia / New Zealand",
  [Region.EU]: "Europe",
  [Region.JA]: "Japan",
  [Region.US]: "United States",
};

export const getGameFromFormInput = (values: GameFormData): Game => ({
  ...values,
  variant: values.variant.split(","),
});

export const getFormInputValuesFromGame = (
  game: WithId<Game>
): GameFormData => {
  const { id, ...gameWithoutId } = game;
  return {
    ...gameWithoutId,
    variant: !!game.variant?.length ? game.variant.join(",") : "",
    art: game.art ?? "",
  };
};

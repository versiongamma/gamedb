import { GameFormData } from "@/components/form/add-game-form";
import { EditGameFormData } from "@/components/form/edit-game-form";
import { Game, GraphQLGame, Palette, WithId } from "@/types";

export const getFormInputValuesFromGame = (game: GraphQLGame): GameFormData => {
  const { id, __typename, ...gameWithoutIdOrTypename } = game;
  return {
    ...gameWithoutIdOrTypename,
    year: game.year.toString(),
    variant: !!game.variant ? game.variant : "",
    art: game.art ?? "",
  };
};

export const getEditFormInputValuesFromGame = (
  game: GraphQLGame
): EditGameFormData => {
  const { id, __typename, colorOptions, ...gameWithoutIdOrTypename } = game;
  const { color } = game;
  const paletteOption = colorOptions
    ? Object.keys(colorOptions)
        .map((option) => ({
          option,
          hex: colorOptions[option as Palette],
        }))
        .find((option) => option.hex === color)?.option ?? Palette.DARK_VIBRANT
    : Palette.DARK_VIBRANT;

  return {
    ...gameWithoutIdOrTypename,
    year: game.year.toString(),
    variant: game?.variant ?? "",
    color: paletteOption as Palette,
  };
};

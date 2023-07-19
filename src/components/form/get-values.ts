import { EditGameFormData } from "@/components/form/edit-game-form";
import { GraphQLGame, Palette, Platform, Region } from "@/types";

export const YEAR_REGEX = /[0-9]+/;

export const getEditFormInputValuesFromGame = (
  game: GraphQLGame
): EditGameFormData => {
  const { id, __typename, indexInPlatform, colorOptions, ...gameFormFields } =
    game;
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
    ...gameFormFields,
    year: game.year.toString(),
    variant: game?.variant ?? "",
    color: paletteOption as Palette,
  };
};

export type EditFormErrorType = {
  input: keyof EditGameFormData;
  message: string;
};

export const validateEditFormData = (data: Partial<EditGameFormData>) => {
  const errors: EditFormErrorType[] = [];

  if (!data.name) {
    errors.push({ input: "name", message: "Name must not be empty" });
  }

  if (!data.year) {
    errors.push({ input: "year", message: "Year must not be empty" });
  }

  if (Number.isNaN(Number(data.year))) {
    errors.push({ input: "year", message: "Year must be a number value" });
  }

  if (!data.platform) {
    errors.push({ input: "platform", message: "Platform must not be empty" });
  }

  // type assertion is fine, we are specifically checking if the type is bad or not
  if (!Object.values(Platform).includes(data.platform as Platform)) {
    errors.push({
      input: "platform",
      message: `${data.platform} is not a valid platform`,
    });
  }

  if (!data.art) {
    errors.push({ input: "art", message: "Box art must not be empty" });
  }

  if (!data.color) {
    errors.push({
      input: "color",
      message: "Palette colour selection must not be empty",
    });
  }

  if (!Object.values(Palette).includes(data.color as Palette)) {
    errors.push({
      input: "color",
      message: `${data.color} is not a valid palette colour`,
    });
  }

  if (!data.region) {
    errors.push({
      input: "region",
      message: "Region must not be empty",
    });
  }

  if (!Object.values(Region).includes(data.region as Region)) {
    errors.push({
      input: "region",
      message: `${data.region} is not a valid region`,
    });
  }

  return errors;
};

import { GameFormData } from '@/components/form/game-form';
import { GraphQLGame, Palette, Platform, Region } from '@/types';

export const YEAR_REGEX = /[0-9]+/;

export const getFormInputValuesFromGame = (
  game?: GraphQLGame,
): Partial<GameFormData> => {
  if (!game) {
    return {};
  }

  const { id, __typename, indexInPlatform, colorOptions, ...gameFormData } =
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
    ...gameFormData,
    year: game.year.toString(),
    variant: game?.variant ?? '',
    color: paletteOption as Palette,
  };
};

export type EditFormErrorType = {
  input: keyof GameFormData;
  message: string;
};

export const validateEditFormData = (data: Partial<GameFormData>) => {
  const errors: EditFormErrorType[] = [];

  if (!data.name) {
    errors.push({ input: 'name', message: 'Name must not be empty' });
  }

  if (!data.year) {
    errors.push({ input: 'year', message: 'Year must not be empty' });
  }

  if (Number.isNaN(Number(data.year))) {
    errors.push({ input: 'year', message: 'Year must be a number value' });
  }

  if (!data.platform) {
    errors.push({ input: 'platform', message: 'Platform must not be empty' });
  }

  // type assertion is fine, we are specifically checking if the type is bad or not
  if (!Object.values(Platform).includes(data.platform as Platform)) {
    errors.push({
      input: 'platform',
      message: `${data.platform} is not a valid platform`,
    });
  }

  if (!!data.color && !Object.values(Palette).includes(data.color as Palette)) {
    errors.push({
      input: 'color',
      message: `${data.color} is not a valid palette colour`,
    });
  }

  if (!data.region) {
    errors.push({
      input: 'region',
      message: 'Region must not be empty',
    });
  }

  if (!Object.values(Region).includes(data.region as Region)) {
    errors.push({
      input: 'region',
      message: `${data.region} is not a valid region`,
    });
  }

  return errors;
};

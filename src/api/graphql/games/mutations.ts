import db from '@/api/primitives/db';
import { GameFormData } from '@/components/form/game-form';
import { Game, Palette, Platform, Region } from '@/types';
import { Palette as VibrantPalette } from '@vibrant/color';
import Vibrant from 'node-vibrant';

const DEFAULT_ART_COLOR = '#303030';
const DEFAULT_PALETTE_SELECTION = Palette.DARK_VIBRANT;
const DEFAULT_PALETTE = {
  Vibrant: DEFAULT_ART_COLOR,
  Muted: DEFAULT_ART_COLOR,
  LightVibrant: DEFAULT_ART_COLOR,
  DarkVibrant: DEFAULT_ART_COLOR,
  LightMuted: DEFAULT_ART_COLOR,
  DarkMuted: DEFAULT_ART_COLOR,
};

type GameWithoutId = Omit<Game, 'id'>;

const getArtPalette = async (art?: string): Promise<VibrantPalette | null> => {
  try {
    const palette = await Vibrant.from(art ?? '').getPalette();
    return palette;
  } catch {
    return null;
  }
};

const getGameFromInput = async (
  gameData: GameFormData,
  paletteOption?: Palette,
): Promise<GameWithoutId> => {
  const palette = await getArtPalette(gameData?.art);
  const colorOptions: Record<Palette, string> = Object.values(Palette).reduce(
    (memo, option) => {
      const color = palette && palette[option]?.hex;

      if (color) {
        memo[option] = color;
      }

      return memo;
    },
    DEFAULT_PALETTE,
  );

  return {
    ...gameData,
    year: Number(gameData.year),
    color:
      (palette && palette[paletteOption ?? DEFAULT_PALETTE_SELECTION]?.hex) ??
      DEFAULT_ART_COLOR,
    colorOptions,
  };
};

export type AddGameArguments = {
  list: string;
  gameData: {
    name: string;
    year: string;
    platform: Platform;
    art: string;
    region: Region;
    variant: string;
  };
};

export const addGame = async ({
  list,
  gameData,
}: AddGameArguments): Promise<Game> => {
  const game = await getGameFromInput(gameData);
  const result = await db.collection(list).add(game);
  const snapshot = await result.get();
  const id = snapshot.id;
  return { id, ...(snapshot.data() as GameWithoutId) };
};

export type EditGameArguments = {
  list: string;
  id: string;
  gameData: {
    name: string;
    year: string;
    platform: Platform;
    art: string;
    color: Palette;
    region: Region;
    variant: string;
  };
};

export const editGame = async ({
  list,
  id,
  gameData: { color, ...gameData },
}: EditGameArguments): Promise<Game> => {
  const updatedGame = await getGameFromInput(gameData, color);
  const doc = await db.collection(list).doc(id);
  await doc.update(updatedGame);
  const result = await doc.get();
  return { id: result.id, ...(result.data() as Omit<Game, 'id'>) };
};

export type DeleteGameArguments = {
  list: string;
  id: string;
};

export const deleteGame = async ({ list, id }: DeleteGameArguments) => {
  const result = await db.collection(list).doc(id).delete();

  return {
    id: id,
    success: !!result,
  };
};

export type UpdateGameOrderArguments = {
  list: string;
  order: {
    id: string;
    indexInPlatform: number;
  }[];
};

export const updateGameOrder = async ({
  list,
  order,
}: UpdateGameOrderArguments) => {
  const batch = db.batch();
  await Promise.all(
    order.map(async ({ id, indexInPlatform }) => {
      const game = await db.collection(list).doc(id);
      batch.update(game, { indexInPlatform });
    }),
  );

  await batch.commit();
  return { order };
};

export type MoveGameArguments = {
  id: string;
  fromList: string;
  toList: string;
};

export const moveGame = async ({ id, fromList, toList }: MoveGameArguments) => {
  const data = (await db.collection(fromList).doc(id).get()).data() as Game;
  console.log(data);
  const { id: _id, ...gameWithoutId } = data;
  const result = await db.collection(toList).add(gameWithoutId);
  await db.collection(fromList).doc(id).delete();
  const snapshot = await result.get();
  return { id: snapshot.id, ...(snapshot.data() as GameWithoutId) };
};

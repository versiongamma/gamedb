import { Game, Palette, Platform, Region } from "@/types";
import { GameFormData } from "@/components/form/add-game-form";
import db from "../primitives/db";
import Vibrant from "node-vibrant";

const DEFAULT_GAME_COLLECTION_PATH = "games";
const DEFAULT_ART_COLOR = "#303030";
const DEFAULT_ART_PALETTE = Palette.DARK_VIBRANT;

type GameWithoutId = Omit<Game, "id">;
const { GAME_COLLECTION_PATH = DEFAULT_GAME_COLLECTION_PATH } = process.env;

export const fetchGames = async (): Promise<Game[]> => {
  const response = await db.collection(GAME_COLLECTION_PATH).get();
  const games = response.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Omit<Game, "id">),
  }));

  return games;
};

const getGameFromInput = async (
  gameData: GameFormData,
  paletteOption?: Palette
): Promise<GameWithoutId> => {
  const palette = await Vibrant.from(gameData.art).getPalette();
  const colorOptions: Record<Palette, string> = Object.values(Palette).reduce(
    (memo, option) => {
      const color = palette[option]?.hex;

      if (color) {
        memo[option] = color;
      }

      return memo;
    },
    {
      Vibrant: DEFAULT_ART_COLOR,
      Muted: DEFAULT_ART_COLOR,
      LightVibrant: DEFAULT_ART_COLOR,
      DarkVibrant: DEFAULT_ART_COLOR,
      LightMuted: DEFAULT_ART_COLOR,
      DarkMuted: DEFAULT_ART_COLOR,
    }
  );

  return {
    ...gameData,
    year: Number(gameData.year),
    color:
      palette[paletteOption ?? DEFAULT_ART_PALETTE]?.hex ?? DEFAULT_ART_COLOR,
    colorOptions,
  };
};

export type AddGameArguments = {
  gameData: {
    name: string;
    year: string;
    platform: Platform;
    art: string;
    region: Region;
    variant: string;
  };
};

export const addGame = async (args: AddGameArguments): Promise<Game> => {
  const { gameData } = args;
  const game = await getGameFromInput(gameData);
  const result = await db.collection(GAME_COLLECTION_PATH).add(game);
  console.log(result);
  const snapshot = await result.get();
  const id = snapshot.id;
  return { id, ...(snapshot.data() as GameWithoutId) };
};

export type EditGameArguments = {
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

export const editGame = async (args: EditGameArguments): Promise<Game> => {
  const {
    id,
    gameData: { color, ...gameData },
  } = args;

  const game = await getGameFromInput(gameData, color);
  const updatedGame: Game = {
    id,
    ...game,
  };

  await db.collection(GAME_COLLECTION_PATH).doc(id).update(updatedGame);
  return { ...updatedGame };
};

export type DeleteGameArguments = {
  id: string;
};

export const deleteGame = async (args: DeleteGameArguments) => {
  const result = await db
    .collection(GAME_COLLECTION_PATH)
    .doc(args.id)
    .delete();

  return {
    id: args.id,
    success: !!result,
  };
};

export type UpdateGameOrderArguments = {
  order: {
    id: string;
    indexInPlatform: number;
  }[];
};

export const updateGameOrder = async (args: UpdateGameOrderArguments) => {
  const { order } = args;
  const batch = db.batch();
  await Promise.all(
    order.map(async ({ id, indexInPlatform }) => {
      const game = await db.collection(GAME_COLLECTION_PATH).doc(id);
      batch.update(game, { indexInPlatform });
    })
  );

  await batch.commit();
  return { order };
};

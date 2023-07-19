export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type WithId<T> = { id: string } & T;

export enum Region {
  US = "US",
  EU = "EU",
  JA = "JA",
  AUNZ = "AUNZ",
}

export enum Platform {
  NES = "NES",
  SNES = "SNES",
  N64 = "N64",
  GC = "GameCube",
  WII = "Wii",
  WIIU = "Wii U",
  SWITCH = "Nintendo Switch",
  GBA = "GameBoy Advanced",
  NDS = "Nintendo DS",
  N3DS = "Nintendo 3DS",
  XBOX = "Xbox",
  XBOX360 = "Xbox 360",
  PS2 = "Playstation 2",
  PS3 = "Playstation 3",
  PS4 = "Playstation 4",
  PS5 = "Playstation 5",
  PC = "PC",
}

export enum Palette {
  VIBRANT = "Vibrant",
  MUTED = "Muted",
  LIGHT_VIBRANT = "LightVibrant",
  DARK_VIBRANT = "DarkVibrant",
  LIGHT_MUTED = "LightMuted",
  DARK_MUTED = "DarkMuted",
}

export type Game = {
  id: string;
  name: string;
  year: number;
  region: Region;
  platform: Platform;
  art: string;
  color: string;
  colorOptions: Record<Palette, string>;
  variant?: string;
  indexInPlatform?: number;
};

export type GraphQLGame = Game & { __typename: string };

export type WishlistItem = {
  id: string;
  name: string;
  region?: Region;
  platform: Platform;
  variant?: string;
};

export type GraphQLWishlistItem = WishlistItem & { __typename: string };

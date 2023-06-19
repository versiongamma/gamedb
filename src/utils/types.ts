import { Platform, Region } from "@/types";

export const REGION_LABEL_MAP: Record<Region, string> = {
  [Region.AUNZ]: "PAL (AU/NZ)",
  [Region.EU]: "PAL",
  [Region.JA]: "NTSC-J",
  [Region.US]: "NTSC-U",
};

export const PLATFORMS_BY_YEAR: Platform[] = [
  Platform.NES,
  Platform.SNES,
  Platform.N64,
  Platform.PS2,
  Platform.GBA,
  Platform.GC,
  Platform.XBOX,
  Platform.NDS,
  Platform.PS3,
  Platform.XBOX360,
  Platform.N3DS,
  Platform.WIIU,
  Platform.PS4,
  Platform.SWITCH,
  Platform.PS5,
  Platform.PC,
];

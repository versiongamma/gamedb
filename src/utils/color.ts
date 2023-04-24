import Vibrant from "node-vibrant";

export const rgbToHex = (rgb: number[]) => {
  return `#${rgb[0].toString(16)}${rgb[1].toString(16)}${rgb[2].toString(16)}`;
};

export const getColorFromUrl = async (url: string) => {
  const palette = await Vibrant.from(url).getPalette();

  return palette.DarkVibrant?.hex;
};

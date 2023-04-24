export enum Region {
  US = "US",
  EU = "EU",
  JA = "JA",
  AUNZ = "AUNZ",
}

export type Game = {
  name: string;
  region: Region;
  platform: string;
  variant?: string[];
  art?: string;
};

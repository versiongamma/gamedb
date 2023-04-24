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

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type WithId<T> = { id: string } & T;

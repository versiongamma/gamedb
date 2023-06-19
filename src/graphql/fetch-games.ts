import { GraphQLGame } from "@/types";
import { gql } from "@apollo/client";

export const FETCH_GAMES = gql`
  query FetchGames {
    FetchGames {
      id
      name
      platform
      year
      art
      region
      color
      colorOptions {
        Vibrant
        Muted
        LightVibrant
        DarkVibrant
        LightMuted
        DarkMuted
      }
      variant
    }
  }
`;

export type FetchGamesResponse = {
  FetchGames: GraphQLGame[];
};

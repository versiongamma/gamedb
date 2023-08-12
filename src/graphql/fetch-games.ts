import { GraphQLGame } from '@/types';
import { gql } from '@apollo/client';

export const gameFields = gql`
  fragment gameFields on Game {
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
    indexInPlatform
  }
`;

export const FETCH_GAMES = gql`
  query FetchGames($list: String!) {
    FetchGames(list: $list) {
      ...gameFields
    }
  }
  ${gameFields}
`;

export type FetchGamesResponse = {
  FetchGames: GraphQLGame[];
};

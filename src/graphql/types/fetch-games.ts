import { GraphQLGame } from "@/types";
import { gql } from "@apollo/client";

export const FETCH_GAMES = gql`
  query FetchGames($collection: String!) {
    FetchGames(collection: $collection) {
      id
      name
      platform
      year
      art
      region
      color
      variant
    }
  }
`;

export type FetchGamesResponse = {
  FetchGames: GraphQLGame[];
};

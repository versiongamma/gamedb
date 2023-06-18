import { gql } from "apollo-server";

export default gql`
  type Game {
    id: String!
    name: String!
    year: Float!
    region: String!
    platform: String!
    art: String
    color: String
    variant: String
  }

  type Query {
    games: [Game]
  }
`;

import {
  AddGameArguments,
  EditGameArguments,
  FetchGamesArguments,
  addGame,
  editGame,
  fetchGames,
} from "@/graphql/games";
import { Game } from "@/types";
import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";

const typeDefs = `#graphql
    type Game {
      id: String!
      name: String!
      year: Float!
      region: String!
      platform: String!
      art: String
      color: String!
      variant: String
    }

    input GameData {
      name: String!
      year: String!
      platform: String!
      art: String
      region: String!
      variant: String
      color: String
    }

    type Query {
      FetchGames(collection: String!): [Game!]!
    }

    type Mutation {
      EditGame(id: String!, gameData: GameData, collection: String!): Game!
      AddGame(gameData: GameData!, collection: String!): Game!
    }
`;

const resolvers = {
  Query: {
    FetchGames: (_parent: Game[], args: FetchGamesArguments) =>
      fetchGames(args),
  },

  Mutation: {
    EditGame: (_parent: Game, args: EditGameArguments) => editGame(args),
    AddGame: (_parent: Game, args: AddGameArguments) => addGame(args),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default nextHandler(server);

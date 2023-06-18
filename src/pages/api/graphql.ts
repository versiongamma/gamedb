import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";

const typeDefs = `#graphql
  
`;

const resolvers = {
  Query: {
    game: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default nextHandler(server);

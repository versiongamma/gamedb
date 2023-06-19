import resolvers from "@/api/graphql/resolvers";
import typeDefs from "@/api/graphql/types";
import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default nextHandler(server);

import resolvers from "@/api/graphql/resolvers";
import typeDefs from "@/api/graphql/types";
import { ApolloServer } from "@apollo/server";
import { NextContextFunctionArgument, nextHandler } from "apollo-server-nextjs";
import jwt from "jwt-simple";

const { NEXTAUTH_SECRET = "" } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const context = async ({ req }: NextContextFunctionArgument) => {
  try {
    const authorizationToken = req.headers.authorization?.split(" ")[1];
    if (!authorizationToken) {
      throw new Error("No authorization token was provided");
    }

    const userFromToken = jwt.decode(authorizationToken, NEXTAUTH_SECRET);

    if (!userFromToken) {
      throw new Error("Failed to decode access token");
    }

    return { userFromToken };
  } catch (error) {
    const message = `Error when creating GraphQL context: ${
      (error as Error).message
    }`;
    console.error(message);
    throw new Error(message);
  }
};

export default nextHandler(server, {
  context,
});

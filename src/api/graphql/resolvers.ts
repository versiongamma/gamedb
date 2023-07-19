import gameResolvers from "./games/resolvers";

const Query = {
  ...gameResolvers.Query,
};

const Mutation = {
  ...gameResolvers.Mutation,
};

const resolvers = {
  Query,
  Mutation,
};

export default resolvers;

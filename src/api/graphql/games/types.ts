const queries = `#graphql
   type Query {
    FetchGames(list: String!): [Game!]!
  }

`;

const mutations = `#graphql
   type Mutation {
    EditGame(list: String!, id: String!, gameData: EditGameDataInput!): Game!
    AddGame(list: String!, gameData: AddGameDataInput!): Game!
    DeleteGame(list: String!, id: String!): DeleteGameResponse!
    UpdateGameOrder(list: String!, order: [GameOrderInput!]!): UpdateGameOrderResponse!
  }

  input AddGameDataInput {
    name: String!
    year: String!
    platform: String!
    art: String
    region: String!
    variant: String
  }

  input EditGameDataInput {
    name: String!
    year: String!
    platform: String!
    art: String
    color: String!
    region: String!
    variant: String
  }

  input GameOrderInput {
    id: String!
    indexInPlatform: Int!
  }

  type DeleteGameResponse {
    id: String!
    success: Boolean!
  }

  type UpdateGameOrderResponse {
    order: [GameOrder!]!
  }
`;

const types = `#graphql
   type Palette {
    Vibrant: String!,
    Muted: String!,
    LightVibrant: String!,
    DarkVibrant: String!,
    LightMuted: String!,
    DarkMuted: String!,
  }

  type Game {
    id: String!
    name: String!
    year: Int!
    region: String!
    platform: String!
    art: String
    color: String!
    colorOptions: Palette
    variant: String
    indexInPlatform: Int
  }

  type WishlistItem {
    id: String!
    name: String!
    region: String
    platform: String!
    variant: String
  }

  type GameOrder {
    id: String!
    indexInPlatform: Int!
  }
`;

const typeDefs = [queries, mutations, types];

export default typeDefs;

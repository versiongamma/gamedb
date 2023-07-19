const typeDefs = `#graphql
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

    type GameOrder {
      id: String!
      indexInPlatform: Int!
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

    type Query {
      FetchGames: [Game!]!
      FetchWishlist: [WishlistItem!]!
    }

    type Mutation {
      EditGame(id: String!, gameData: EditGameDataInput!): Game!
      AddGame(gameData: AddGameDataInput!): Game!
      DeleteGame(id: String!): DeleteGameResponse!
      UpdateGameOrder(order: [GameOrderInput!]!): UpdateGameOrderResponse!
    }
`;

export default typeDefs;

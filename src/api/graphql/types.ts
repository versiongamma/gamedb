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
      year: Float!
      region: String!
      platform: String!
      art: String
      color: String!
      colorOptions: Palette
      variant: String
    }

    type WishlistItem {
      id: String!
      name: String!
      region: String
      platform: String!
      variant: String
    }

    input AddGameData {
      name: String!
      year: String!
      platform: String!
      art: String
      region: String!
      variant: String
    }

    input EditGameData {
      name: String!
      year: String!
      platform: String!
      art: String
      color: String!
      region: String!
      variant: String
    }

    type DeleteGameResponse {
      id: String!
      success: Boolean!
    }

    type Query {
      FetchGames: [Game!]!
      FetchWishlist: [WishlistItem!]!
    }

    type Mutation {
      EditGame(id: String!, gameData: EditGameData!): Game!
      AddGame(gameData: AddGameData!): Game!
      DeleteGame(id: String!): DeleteGameResponse!
    }
`;

export default typeDefs;

import { GraphQLWishlistItem } from "@/types";
import { gql } from "@apollo/client";

export const FETCH_WISHLIST = gql`
  query FetchWishlist {
    FetchWishlist {
      id
      name
      platform
      region
      variant
    }
  }
`;

export type FetchWishlistResponse = {
  FetchWishlist: GraphQLWishlistItem[];
};

import db from "@/api/primitives/db";
import { Game, WishlistItem } from "@/types";

const DEFAULT_WISHLIST_COLLECTION_PATH = "wishlist";

const { WISHLIST_COLLECTION_PATH = DEFAULT_WISHLIST_COLLECTION_PATH } =
  process.env;

export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await db.collection(WISHLIST_COLLECTION_PATH).get();
  const wishlistItems = response.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Omit<WishlistItem, "id">),
  }));

  return wishlistItems;
};

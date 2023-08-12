export enum Page {
  Collection = 'COLLECTION',
  Wishlist = 'WISHLIST',
}

export enum List {
  Collection = 'games',
  Wishlist = 'wishlist',
}

export const PAGE_TO_LIST_MAP: Record<Page, List> = {
  [Page.Collection]: List.Collection,
  [Page.Wishlist]: List.Wishlist,
};

export const PATHS: Record<Page, string> = {
  [Page.Collection]: '/',
  [Page.Wishlist]: '/wishlist',
};

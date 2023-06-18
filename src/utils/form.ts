import { GameFormData } from "@/components/form/game-form";
import { Game, GraphQLGame, WithId } from "@/types";

export const getFormInputValuesFromGame = (game: GraphQLGame): GameFormData => {
  const { id, __typename, ...gameWithoutIdOrTypename } = game;
  return {
    ...gameWithoutIdOrTypename,
    variant: !!game.variant ? game.variant : "",
    art: game.art ?? "",
  };
};

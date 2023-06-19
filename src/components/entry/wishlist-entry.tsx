import { GraphQLGame, GraphQLWishlistItem } from "@/types";

import { styled } from "goober";
import Variant from "./variant";
import Header from "./header";

const WISHLIST_ITEM_COLOR = "#53365c";

const Button = styled("button")`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Wrapper = styled("div")`
  width: fit-content;
  color: white;
  height: 100px;
  background-color: ${WISHLIST_ITEM_COLOR};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: 0.4rem;

  > * {
    margin: 0.6rem 0.8rem;
  }
`;

const DetailsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  game: GraphQLWishlistItem;
  onClick: (game: GraphQLWishlistItem) => void;
};

const WishlistEntry = ({ game, onClick }: Props) => {
  const { name, platform, region, variant } = game;

  return (
    <Button onClick={() => onClick(game)}>
      <Wrapper>
        <Header name={name} region={region} />
        <DetailsWrapper>
          {variant && <Variant variant={variant} />}
        </DetailsWrapper>
      </Wrapper>
    </Button>
  );
};

export default WishlistEntry;

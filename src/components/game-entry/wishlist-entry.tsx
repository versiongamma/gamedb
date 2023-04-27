import { Game, WithId } from "@/types";

import { styled } from "goober";
import Variant from "./variant";
import Header from "./header";

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
  min-width: 250px;
  height: 100px;
  background-color: #303030;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem;

  > * {
    margin: 0.6rem 0.8rem;
  }
`;

const DetailsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Art = styled("img")`
  height: 210px;
`;

type Props = {
  game: WithId<Game>;
  onClick: (game: WithId<Game>) => void;
};

const WishlistEntry = ({ game, onClick }: Props) => {
  const { name, platform, region, variant } = game;

  return (
    <Button onClick={() => onClick(game)}>
      <Wrapper>
        <Header name={name} platform={platform} region={region} />
        <DetailsWrapper>
          {variant && <Variant variant={variant} />}
        </DetailsWrapper>
      </Wrapper>
    </Button>
  );
};

export default WishlistEntry;

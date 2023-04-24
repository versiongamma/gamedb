import { Game, WithId } from "@/types";
import { REGION_LABEL_MAP } from "@/utils";

import {
  Art,
  DetailsWrapper,
  Header,
  HeaderDetailsWrapper,
  Platform,
  Region,
  Title,
  Wrapper,
} from "./layout";
import Variants from "./variants";
import { styled } from "goober";

const Button = styled("button")`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

type Props = {
  game: WithId<Game>;
  onClick: (game: WithId<Game>) => void;
};

const GameEntry = ({ game, onClick }: Props) => {
  const { name, platform, region, art, variant } = game;
  return (
    <Button onClick={() => onClick(game)}>
      <Wrapper>
        <Header>
          <Title>{name}</Title>
          <HeaderDetailsWrapper>
            <Platform>{platform}</Platform>
            <Region>({REGION_LABEL_MAP[region]})</Region>
          </HeaderDetailsWrapper>
        </Header>
        <DetailsWrapper>
          <Art src={art} />
          {variant && <Variants variants={variant} />}
        </DetailsWrapper>
      </Wrapper>
    </Button>
  );
};

export default GameEntry;

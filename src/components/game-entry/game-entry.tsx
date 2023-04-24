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

type WrapperProps = {
  $color: string;
  children: React.ReactNode;
};

const Wrapper = styled<WrapperProps>("div")`
  width: fit-content;
  color: white;
  min-width: 250px;
  height: 310px;
  background-color: ${({ $color }) => $color ?? "#eeeeee"};
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

const GameEntry = ({ game, onClick }: Props) => {
  const { name, platform, region, art, variant, color } = game;

  return (
    <Button onClick={() => onClick(game)}>
      <Wrapper $color={color}>
        <Header name={name} platform={platform} region={region} />
        <DetailsWrapper>
          <Art src={art} />
          {variant && <Variant variant={variant} />}
        </DetailsWrapper>
      </Wrapper>
    </Button>
  );
};

export default GameEntry;

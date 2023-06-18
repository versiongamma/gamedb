import { GraphQLGame } from "@/types";

import useScreenResolution from "@/hooks/use-screen-resolution";
import { styled } from "goober";
import Header from "./header";
import Variant from "./variant";

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
  $isMobile?: boolean;
  children: React.ReactNode;
};

const Wrapper = styled<WrapperProps>("div")`
  width: fit-content;
  color: white;
  ${({ $isMobile }) => ($isMobile ? "min-width: 90px" : "min-width: 250px")};
  ${({ $isMobile }) => ($isMobile ? "" : "min-height: 310px")};
  background-color: ${({ $color }) => $color ?? "#eeeeee"};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: ${({ $isMobile }) => ($isMobile ? "0.6rem" : "1rem")};

  > * {
    margin: 0.6rem 0.8rem;
  }
`;

const DetailsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type ArtProps = {
  $isMobile?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Art = styled<ArtProps>("img")`
  height: ${({ $isMobile }) => ($isMobile ? "100px" : "210px")};
`;

type Props = {
  game: GraphQLGame;
  onClick: (game: GraphQLGame) => void;
};

const GameEntry = ({ game, onClick }: Props) => {
  const { name, platform, region, art, variant, color } = game;
  const { isMobileResolution } = useScreenResolution();

  return (
    <Button onClick={() => onClick(game)}>
      <Wrapper $color={color} $isMobile={isMobileResolution}>
        {!isMobileResolution && (
          <Header name={name} platform={platform} region={region} />
        )}
        <DetailsWrapper>
          <Art src={art} $isMobile={isMobileResolution} />
          {variant && !isMobileResolution && <Variant variant={variant} />}
        </DetailsWrapper>
      </Wrapper>
    </Button>
  );
};

export default GameEntry;

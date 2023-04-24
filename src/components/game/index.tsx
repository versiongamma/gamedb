import { Game as GameType } from "@/types";
import { REGION_LABEL_MAP } from "@/utils";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

type Props = {
  game: GameType;
};

const Game = ({ game }: Props) => {
  const { name, platform, region, art, variant } = game;
  return (
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
  );
};

export default Game;

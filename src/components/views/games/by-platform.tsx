import { Game, GraphQLGame } from "@/types";
import { PLATFORMS_BY_YEAR } from "@/utils/types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Collapse, Divider, Grid } from "@mui/material";
import { styled } from "goober";
import { useState } from "react";

import GameEntry from "../../entry/game-entry";
import { getGamesByPlatform, sortGamesByYearThenName } from "@/utils/sort";

const StyledDivider = styled(Divider)`
  &.MuiDivider-root::before {
    width: 1%;
  }
`;

const StyledChip = styled(Chip)``;

type PlatformDisplayProps = {
  platform: string;
  games: GraphQLGame[];
  handleGameClick: (game: GraphQLGame) => void;
};

const PlatformDisplay = ({
  platform,
  games,
  handleGameClick,
}: PlatformDisplayProps) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <br />
      <StyledDivider textAlign="left">
        <StyledChip
          label={platform}
          deleteIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onDelete={() => setOpen(!open)}
          onClick={() => setOpen(!open)}
        />
      </StyledDivider>
      <Collapse in={open}>
        <Grid container>
          {games.map((game) => (
            <Grid item key={game.id}>
              <GameEntry game={game} onClick={handleGameClick} />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  );
};

type Props = {
  games: GraphQLGame[];
  handleGameClick: (game: GraphQLGame) => void;
};

const ByPlatform = ({ games, handleGameClick }: Props) => {
  const gamesByPlatform = getGamesByPlatform([...games]);
  const shownPlatforms = Object.keys(gamesByPlatform);
  const platforms = PLATFORMS_BY_YEAR.filter((platform) =>
    shownPlatforms.includes(platform)
  );

  return (
    <>
      {platforms.map((platform) => (
        <PlatformDisplay
          key={platform}
          platform={platform}
          games={gamesByPlatform[platform]}
          handleGameClick={handleGameClick}
        />
      ))}
    </>
  );
};

export default ByPlatform;

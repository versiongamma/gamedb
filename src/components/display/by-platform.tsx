import { Game } from "@/types";
import { PLATFORMS_BY_YEAR } from "@/utils/types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Collapse, Divider, Grid } from "@mui/material";
import { styled } from "goober";
import { useState } from "react";

import GameEntry from "../game-entry/game-entry";
import { sortGamesByYearThenName } from "@/utils/games";

const StyledDivider = styled(Divider)`
  &.MuiDivider-root::before {
    width: 1%;
  }
`;

type PlatformDisplayProps = {
  platform: string;
  games: Game[];
  handleGameClick: (game: Game) => void;
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
        <Chip
          label={platform}
          deleteIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onDelete={() => setOpen(!open)}
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
  games: Game[];
  handleGameClick: (game: Game) => void;
};

const ByPlatform = ({ games, handleGameClick }: Props) => {
  const gamesByPlatform = games
    .sort(sortGamesByYearThenName)
    .reduce<{ [key: string]: Game[] }>((memo, game) => {
      if (Object.keys(memo).includes(game.platform)) {
        memo[game.platform].push(game);
        return memo;
      }

      memo[game.platform] = [game];
      return memo;
    }, {});

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

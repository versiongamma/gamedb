import { Game } from "@/types";
import { Grid } from "@mui/material";
import GameEntry from "../game-entry/game-entry";
import { sortGamesByYearThenName } from "@/utils/games";

type Props = {
  games: Game[];
  handleGameClick: (game: Game) => void;
};

const ByPlatform = ({ games, handleGameClick }: Props) => {
  const sortedGames = games.sort(sortGamesByYearThenName);
  return (
    <Grid container>
      {sortedGames.map((game) => (
        <Grid item key={game.id}>
          <GameEntry game={game} onClick={handleGameClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ByPlatform;

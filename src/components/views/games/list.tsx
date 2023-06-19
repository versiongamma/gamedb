import { Game, GraphQLGame } from "@/types";
import { Grid } from "@mui/material";
import GameEntry from "../../entry/game-entry";
import { sortGamesByYearThenName } from "@/utils/sort";

type Props = {
  games: GraphQLGame[];
  handleGameClick: (game: GraphQLGame) => void;
};

const ByPlatform = ({ games, handleGameClick }: Props) => {
  const sortedGames = [...games].sort(sortGamesByYearThenName);
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

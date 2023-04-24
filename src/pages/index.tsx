import EditGameDialog from "@/components/edit-game/edit-game-dialog";
import GameEntry from "@/components/game-entry/game-entry";
import { Game, WithId } from "@/types";
import { Grid } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [games, setGames] = useState<WithId<Game>[]>([]);
  const [selectedGame, setSelectedGame] = useState<WithId<Game> | null>(null);

  useEffect(() => {
    const get = async () => {
      const response = await axios.get<WithId<Game>[]>("/api/fetch-games");
      setGames(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    };

    get().catch((error) => console.log(error));
  }, []);

  const handleGameClick = (game: WithId<Game>) => {
    setSelectedGame(game);
  };

  return (
    <>
      <Head>
        <title>GameDB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container>
        {games.map((game) => (
          <Grid item key={game.name}>
            <GameEntry game={game} onClick={handleGameClick} />
          </Grid>
        ))}
      </Grid>
      {selectedGame && (
        <EditGameDialog
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          updateGamesCache={setGames}
        />
      )}
    </>
  );
};

export default Home;

import AddGameDialog from "@/components/dialogs/add-game-dialog";
import EditGameDialog from "@/components/dialogs/edit-game-dialog";
import WishlistEntry from "@/components/game-entry/wishlist-entry";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/types/fetch-games";
import { GraphQLGame } from "@/types";
import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Chip, Divider, Fab, Grid } from "@mui/material";
import { styled } from "goober";
import Head from "next/head";
import { useState } from "react";

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

const StyledDivider = styled(Divider)`
  &.MuiDivider-root::before {
    width: 1%;
  }
`;

const Home = () => {
  const { data } = useQuery<FetchGamesResponse>(FETCH_GAMES, {
    variables: { collection: "wishlist" },
  });

  const games = data?.FetchGames ?? [];

  const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  const handleGameClick = (game: GraphQLGame) => {
    setSelectedGame(game);
  };

  const gamesByPlatform = [...games].reduce<{ [key: string]: GraphQLGame[] }>(
    (memo, game) => {
      if (Object.keys(memo).includes(game.platform)) {
        memo[game.platform].push(game);
        return memo;
      }

      memo[game.platform] = [game];
      return memo;
    },
    {}
  );

  const platforms = Object.keys(gamesByPlatform);

  return (
    <>
      <Head>
        <title>GameDB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {platforms.map((platform) => (
        <>
          <br />
          <StyledDivider textAlign="left">
            <Chip label={platform} />
          </StyledDivider>
          <Grid container>
            {gamesByPlatform[platform].map((game) => (
              <Grid item key={game.id}>
                <WishlistEntry game={game} onClick={handleGameClick} />
              </Grid>
            ))}
          </Grid>
        </>
      ))}
      {selectedGame && (
        <EditGameDialog
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          collection="wishlist"
        />
      )}
      <StyledFab
        color="primary"
        aria-label="add"
        onClick={() => setAddGameDialogOpen(true)}
      >
        <AddIcon />
      </StyledFab>
      <AddGameDialog
        open={addGameDialogOpen}
        onClose={() => setAddGameDialogOpen(false)}
        collection="wishlist"
      />
    </>
  );
};

export default Home;

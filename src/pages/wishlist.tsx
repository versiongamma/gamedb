import AddDialog from "@/components/dialogs/add-dialog";
import EditDialog from "@/components/dialogs/edit-dialog";
import WishlistEntry from "@/components/entry/wishlist-entry";
import { FETCH_GAMES, FetchGamesResponse } from "@/graphql/fetch-games";
import {
  FETCH_WISHLIST,
  FetchWishlistResponse,
} from "@/graphql/fetch-wishlist";
import { GraphQLGame } from "@/types";
import { getSortedWishlistItems } from "@/utils/sort";
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
  const { data } = useQuery<FetchWishlistResponse>(FETCH_WISHLIST);

  const games = data?.FetchWishlist ?? [];

  // const [addGameDialogOpen, setAddGameDialogOpen] = useState(false);
  // const [selectedGame, setSelectedGame] = useState<GraphQLGame | null>(null);
  // const handleGameClick = (game: GraphQLGame) => {
  //   setSelectedGame(game);
  // };

  const gamesByPlatform = getSortedWishlistItems([...games]);
  const platforms = Object.keys(gamesByPlatform);

  return (
    <>
      {platforms.map((platform) => (
        <>
          <br />
          <StyledDivider textAlign="left">
            <Chip label={platform} />
          </StyledDivider>
          <Grid container>
            {gamesByPlatform[platform].map((game) => (
              <Grid item key={game.id}>
                <WishlistEntry game={game} onClick={() => {}} />
              </Grid>
            ))}
          </Grid>
        </>
      ))}
      {/* {selectedGame && (
        <EditDialog game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
      <StyledFab
        color="primary"
        aria-label="add"
        onClick={() => setAddGameDialogOpen(true)}
      >
        <AddIcon />
      </StyledFab>
      <AddDialog
        open={addGameDialogOpen}
        onClose={() => setAddGameDialogOpen(false)}
      /> */}
    </>
  );
};

export default Home;

import Header from "@/components/header";
import WishlistEntry from "@/components/entry/wishlist-entry";
import {
  FETCH_WISHLIST,
  FetchWishlistResponse,
} from "@/graphql/fetch-wishlist";
import { getSortedWishlistItems } from "@/utils/sort";
import { useQuery } from "@apollo/client";
import { Chip, Divider, Fab, Grid } from "@mui/material";
import { styled } from "goober";
import Head from "next/head";
import { PageWrapper } from "@/components/views/layout";

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
      <Head>
        <title>GameDB</title>
      </Head>
      <Header />
      <PageWrapper>
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
      </PageWrapper>
    </>
  );
};

export default Home;

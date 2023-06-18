import Header from "@/components/header";
import theme from "@/theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup, styled } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement } from "react";

const DEFAULT_BACKGROUND_IMAGE = "https://i.imgur.com/5pHkLhw.jpg";

setup(
  createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => prop[0] !== "$")
);

const PageWrapper = styled("div")`
  padding-top: 64px;
  height: 100vh;
  overflow-y: auto;
`;

const assistant = Assistant({ subsets: ["latin"] });

const Index = ({ Component, ...pageProps }: AppProps) => {
  const { NEXT_PUBLIC_ENV, NEXT_PUBLIC_GRAPHQL_ENDPOINT } = process.env;
  console.log(NEXT_PUBLIC_GRAPHQL_ENDPOINT);
  const { data: session } = useSession();
  const client = new ApolloClient({
    uri: NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    connectToDevTools: NEXT_PUBLIC_ENV !== "prod",
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <PageWrapper>{session && <Component {...pageProps} />}</PageWrapper>
    </ApolloProvider>
  );
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <ThemeProvider theme={theme}>
      <div
        className={assistant.className}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${DEFAULT_BACKGROUND_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <CssBaseline />
        <Index Component={Component} {...pageProps} />
      </div>
    </ThemeProvider>
  </SessionProvider>
);

export default App;

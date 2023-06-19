import Header from "@/components/header";
import useEnv from "@/hooks/use-env";
import theme from "@/theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup, styled } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import Head from "next/head";
import { createElement, useMemo } from "react";

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
  const { ENV, GRAPHQL_URL } = useEnv();
  const { data: session } = useSession();

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: GRAPHQL_URL,
        cache: new InMemoryCache(),
        connectToDevTools: ENV !== "prod",
      }),
    [GRAPHQL_URL, ENV]
  );

  if (!session || !GRAPHQL_URL) {
    return <Header />;
  }

  return (
    <ApolloProvider client={client}>
      <Header />
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </ApolloProvider>
  );
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Head>
      <title>GameDB</title>
      <meta
        name="description"
        content="Version Gamma's Game Collection Database"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <link rel="apple-touch-icon" href="/favicon.ico"></link>
      <link rel="icon" href="/favicon.ico" />
    </Head>
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
  </>
);

export default App;

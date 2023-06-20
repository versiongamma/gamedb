import Header from "@/components/header";
import Login from "@/components/header/login";
import useEnv from "@/hooks/use-env";
import theme from "@/theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup, styled } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement, useMemo } from "react";

const DEFAULT_BACKGROUND_IMAGE = "https://i.imgur.com/5pHkLhw.jpg";

setup(
  createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => prop[0] !== "$")
);

const assistant = Assistant({ subsets: ["latin"] });

const LoginWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

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

  if (!session) {
    return <Header />;
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
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

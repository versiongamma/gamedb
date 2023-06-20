import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement, useMemo } from "react";

import useEnv from "@/hooks/use-env";
import theme from "@/theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Page from "@/components/page";

const DEFAULT_BACKGROUND_IMAGE = "https://i.imgur.com/5pHkLhw.jpg";

setup(
  createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => prop[0] !== "$")
);

const assistant = Assistant({ subsets: ["latin"] });

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
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
          <Page Component={Component} {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;

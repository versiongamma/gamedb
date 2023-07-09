import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement } from "react";

import Page from "@/components/page";
import theme from "@/theme";
import Head from "next/head";

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        ></meta>
      </Head>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
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
    </>
  );
};

export default App;

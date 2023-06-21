import { CssBaseline, ThemeProvider } from "@mui/material";
import { setup } from "goober";
import { shouldForwardProp } from "goober/should-forward-prop";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement } from "react";

import Page from "@/components/page";
import theme from "@/theme";

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

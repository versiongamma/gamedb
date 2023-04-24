import Header from "@/components/header";
import { CssBaseline } from "@mui/material";
import { setup } from "goober";
import type { AppProps } from "next/app";
import { Assistant } from "next/font/google";
import { createElement } from "react";

setup(createElement);

const assistant = Assistant({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={assistant.className}>
      <CssBaseline>
        <Header />
        <Component {...pageProps} />
      </CssBaseline>
    </main>
  );
}

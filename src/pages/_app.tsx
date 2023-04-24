import type { AppProps } from "next/app";
import { createElement } from "react";
import { setup } from "goober";

setup(createElement);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

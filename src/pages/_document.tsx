import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="version" content="v0.1.0" />
        <meta
          name="description"
          content="Version Gamma's Game Collection Database"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        ></meta>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

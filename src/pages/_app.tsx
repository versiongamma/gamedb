import Header from '@/components/header';
import { PageLoadWrapper } from '@/components/layout';
import Login from '@/components/login';
import theme from '@/theme';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { setup } from 'goober';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Assistant } from 'next/font/google';
import Head from 'next/head';
import { createElement, useMemo } from 'react';

import '../globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const DEFAULT_BACKGROUND_IMAGE = 'https://i.imgur.com/5pHkLhw.jpg';

setup(
  createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => prop[0] !== '$'),
);

const assistant = Assistant({ subsets: ['latin'] });

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const ENV = process.env.NEXT_PUBLIC_ENV;

const Page = ({ Component, ...pageProps }: AppProps) => {
  const { data: session } = useSession();

  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: GRAPHQL_URL });
    const authMiddleware = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${session?.token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
      connectToDevTools: ENV !== 'prod',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!session) {
    return (
      <PageLoadWrapper>
        <Login />
      </PageLoadWrapper>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <div
              className={assistant.className}
              style={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${DEFAULT_BACKGROUND_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            >
              <CssBaseline />
              <Page Component={Component} {...pageProps} />
            </div>
          </ThemeProvider>
        </StyledEngineProvider>
      </SessionProvider>
    </>
  );
};

export default App;

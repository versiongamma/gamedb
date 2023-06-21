import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useMemo } from "react";

import Login from "./login";
import { PageLoadWrapper } from "./views/layout";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const ENV = process.env.NEXT_PUBLIC_ENV;

const Page = ({ Component, ...pageProps }: AppProps) => {
  const { data: session } = useSession();
  const { token } = session ?? {};

  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: GRAPHQL_URL });
    const authMiddleware = setContext((_operation, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
      connectToDevTools: ENV !== "prod",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return (
      <PageLoadWrapper>
        <Login />
      </PageLoadWrapper>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default Page;

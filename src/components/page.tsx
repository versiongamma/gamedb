import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useMemo } from "react";

import useEnv from "@/hooks/use-env";
import Login from "./login";
import { PageLoadWrapper } from "./views/layout";

const Page = ({ Component, ...pageProps }: AppProps) => {
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

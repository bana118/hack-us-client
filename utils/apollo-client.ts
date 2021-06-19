import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { tokenKeyName } from "./token-key-name";

// SSRの時はcontextを用いてヘッダーにtokenをセットする
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: "include",
  headers:
    typeof window !== "undefined"
      ? {
          [tokenKeyName]: Object.fromEntries(
            document.cookie
              .split("; ")
              .map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent))
          )[tokenKeyName],
        }
      : {},
});

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: httpLink,
  cache: new InMemoryCache(),
});

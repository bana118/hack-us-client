import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { tokenKeyName } from "./token-key-name";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  // TODO credentials: "include"でcookieをサーバーに送れるはずだが送れないのでheadersで送る
  // credentials: "include",
});

// SSRの時はcontextを用いてヘッダーにtokenをセットする
const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined"
      ? Object.fromEntries(
          document.cookie
            .split("; ")
            .map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent))
        )[tokenKeyName]
      : "";
  const authorizationHeader = headers != null ? headers["authorization"] : null;
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : authorizationHeader
        ? authorizationHeader
        : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

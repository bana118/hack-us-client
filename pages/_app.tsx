import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { analytics, auth } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import nookies from "nookies";
import { apolloClient } from "../utils/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { tokenKeyName, uidKeyName } from "../utils/cookie-key-names";
import { GetUserQuery, GetUserQueryVariables } from "../types/graphql";
import { createUserfromLoginResult } from "../utils/auth-provider";
import { GET_USER } from "../interfaces/User";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Noto Sans JP", "Meiryo", "sans-serif"].join(","),
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [authUser, setAuthUser] = useState<firebase.User | null | undefined>(
    undefined
  );
  const [user, setUser] = useState<GetUserQuery["user"] | null | undefined>(
    undefined
  );

  useEffect(() => {
    const getLoginResult = async () => {
      await createUserfromLoginResult();
    };
    auth.onIdTokenChanged(async (u) => {
      if (!u) {
        setAuthUser(null);
        setUser(null);
        nookies.set(undefined, tokenKeyName, "", { path: "/" });
        nookies.set(undefined, uidKeyName, "", { path: "/" });
      } else {
        const token = await u.getIdToken();
        setAuthUser(u);
        nookies.set(undefined, tokenKeyName, token, { path: "/" });
        nookies.set(undefined, uidKeyName, u.uid, { path: "/" });
        try {
          await getLoginResult();
          const { data } = await apolloClient.query<
            GetUserQuery,
            GetUserQueryVariables
          >({
            query: GET_USER,
            variables: { uid: u.uid },
          });
          setUser(data.user);
        } catch (error) {
          console.error(error);
        }
      }
    });

    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, user }}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default MyApp;

import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { analytics, auth } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import nookies from "nookies";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Noto Sans JP", "Meiryo", "sans-serif"].join(","),
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [authUser, setAuthUser] = useState<firebase.User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onIdTokenChanged(async (u) => {
      if (!u) {
        setAuthUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await u.getIdToken();
        setAuthUser(u);
        nookies.set(undefined, "token", token, { path: "/" });
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
    <AuthContext.Provider value={{ authUser }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default MyApp;

import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { analytics, auth } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";

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
    auth.onAuthStateChanged((u) => {
      setAuthUser(u);
    });

    if (process.env.NODE_ENV === "production") {
      analytics();
    }
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

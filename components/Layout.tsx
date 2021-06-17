import { ReactNode, useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";
import { Global } from "@emotion/react";
import { LoginDialog } from "../components/SimpleDialog";
import { storeUserfromLoginResult } from "../utils/auth-provider";
import Router from "next/router";
import { AuthContext } from "../context/AuthContext";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { authUser } = useContext(AuthContext);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    const getLoginResult = async () => {
      await storeUserfromLoginResult();
      Router.push("/");
    };

    if (authUser != null) {
      getLoginResult();
    }
  }, [authUser]);

  return (
    <div>
      <Global
        styles={{
          body: {
            fontFamily: ["Roboto", "Noto Sans JP", "Meiryo", "sans-serif"].join(
              ","
            ),
            margin: 0,
          },
        }}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hack Us
          </Typography>
          {/* TODO ログイン or ログアウト 切り替え */}
          <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <Container>
        <footer>
          <hr />
          <Grid
            container
            justifyContent="center"
            textAlign="center"
            spacing={6}
          >
            <Grid item xs={12} md="auto">
              <Link href="/">
                <a>トップページ</a>
              </Link>
            </Grid>
            <Grid item xs={12} md="auto">
              <Link href="/privacy">
                <a>プライバシーポリシー</a>
              </Link>
            </Grid>
            <Grid item xs={12} md="auto">
              <a href="github.com/bana118/hack-us-client">Github</a>
            </Grid>
          </Grid>
        </footer>
      </Container>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </div>
  );
};

export default Layout;

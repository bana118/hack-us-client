import { ReactNode } from "react";
import Link from "next/link";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <Container>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hack Us
          </Typography>
          {/* TODO ログイン or ログアウト 切り替え */}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
    <Container>
      <footer>
        <hr />
        <Grid container justifyContent="center" textAlign="center" spacing={6}>
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
  </div>
);

export default Layout;

import React, { ReactNode, useContext, useRef, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Button,
  Box,
  Container,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Popover,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Global } from "@emotion/react";
import { LoginDialog } from "./LoginDialog";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../utils/firebase";
import Image from "next/image";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { user } = useContext(AuthContext);
  const userButtonRef = useRef(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);

  return (
    <div>
      <Global
        styles={{
          body: {
            fontFamily: ["Roboto", "Noto Sans JP", "Meiryo", "sans-serif"].join(
              ","
            ),
            margin: 0,
            backgroundColor: "#F5F5F5",
          },
        }}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hack Us
          </Typography>
          {user === null && (
            <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
              Login
            </Button>
          )}
          {user != null && (
            <React.Fragment>
              <IconButton
                ref={userButtonRef}
                onClick={() => setUserPopoverOpen(true)}
              >
                <Avatar>
                  <Image
                    src={user.githubIconUrl}
                    alt="Github Icon"
                    layout="fill"
                  />
                </Avatar>
              </IconButton>
              <Popover
                open={userPopoverOpen}
                anchorEl={userButtonRef.current}
                onClose={() => setUserPopoverOpen(false)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List>
                  <ListItem button component="a" href={"/profile"}>
                    <ListItemText primary="プロフィールの編集" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    {/* TODO プロジェクト作成ページ */}
                    <ListItemText primary="プロジェクトの作成" />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={() => auth.signOut()}>
                    <ListItemText primary="ログアウト" />
                  </ListItem>
                </List>
              </Popover>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Box m={0}>{children}</Box>
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

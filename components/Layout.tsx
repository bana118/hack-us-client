import React, { ReactNode, useContext, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { background, themeMain, textGrey } from "../utils/style-variables";
import { SearchInput } from "./SearchInput";

type LayoutProps = {
  showSearch?: boolean;
  children?: ReactNode;
};

const Layout = ({ showSearch = true, children }: LayoutProps): JSX.Element => {
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
            backgroundColor: background,
          },
        }}
      />
      <AppBar
        position="static"
        css={{
          backgroundColor: "#ffffff",
          padding: "0px 100px",
          boxShadow: "none",
        }}
      >
        <Toolbar css={{ padding: 0 }}>
          <div css={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography
                variant="h5"
                component="a"
                css={{ textDecoration: "none" }}
              >
                <Image
                  src="/HackUs.svg"
                  alt="HackUs Logo"
                  width={250}
                  height={100}
                />
              </Typography>
            </Link>
          </div>

          {showSearch && <SearchInput />}

          {user === null && (
            <Button
              css={{ color: textGrey, fontWeight: "bold", fontSize: 14 }}
              onClick={() => setLoginDialogOpen(true)}
            >
              Login
            </Button>
          )}
          {user != null && (
            <React.Fragment>
              <IconButton
                ref={userButtonRef}
                onClick={() => setUserPopoverOpen(true)}
              >
                <Box borderRadius={50} border={1} borderColor={themeMain}>
                  <Avatar>
                    <Image
                      src={user.githubIconUrl}
                      alt="Github Icon"
                      layout="fill"
                    />
                  </Avatar>
                </Box>
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
                  <ListItem button component="a" href={"/create-project"}>
                    <ListItemText primary="プロジェクトの作成" />
                  </ListItem>
                  <Divider />
                  <ListItem button component="a" href={"/my-project"}>
                    <ListItemText primary="プロジェクトの管理" />
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

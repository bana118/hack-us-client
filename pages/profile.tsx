import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProfileForm } from "../components/ProfileForm";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import { Grid } from "@material-ui/core";
import { css } from "@emotion/react";

const container = css`
  padding: 30px 130px;
  display: flex;
  flex-direction: column;
`;

const title = css`
  font-size: 28px;
  font-weight: bold;
`;

const ProfilePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      Router.push("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      {user != null && (
        <Layout>
          <MyHead title="ユーザーページ - Hack Us" />
          <Grid container css={container}>
            <h1 css={title}>ユーザーページ</h1>
            <ProfileForm user={user} />
          </Grid>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;

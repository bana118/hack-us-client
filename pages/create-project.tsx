import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectForm } from "../components/ProjectForm";
import { css } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import { Grid } from "@material-ui/core";

const container = css`
  padding: 30px 130px;
`;

const title = css`
  font-size: 28px;
  font-weight: bold;
`;

const CreateProject = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      Router.push("/");
    }
  }, [user]);

  return (
    <Layout>
      {user != null && (
        <React.Fragment>
          <MyHead title="プロジェクトの作成 - Hack Us" />
          <Grid container css={container}>
            <h1 css={title}>プロジェクトの作成</h1>
            <ProjectForm user={user} />
          </Grid>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default CreateProject;

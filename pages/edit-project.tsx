import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectForm } from "../components/ProjectForm";
import { css } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import { apolloClient } from "../utils/apollo-client";
import { GetProjectQuery, GetProjectQueryVariables } from "../types/graphql";
import { GET_PROJECT } from "../interfaces/Project";
import { Grid } from "@material-ui/core";

const container = css`
  padding: 30px 130px;
`;

const title = css`
  font-size: 28px;
  font-weight: bold;
`;

type Props = {
  project?: GetProjectQuery["project"];
};

const EditProject = (props: Props): JSX.Element => {
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
          <MyHead title="プロジェクトの編集 - Hack Us" />
          <Grid container css={container}>
            <h1 css={title}>プロジェクトの編集</h1>
            <ProjectForm user={user} project={props.project} />
          </Grid>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default EditProject;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id !== undefined)
    try {
      const { data } = await apolloClient.query<
        GetProjectQuery,
        GetProjectQueryVariables
      >({
        query: GET_PROJECT,
        variables: {
          id: id as string,
        },
        fetchPolicy: "no-cache",
      });
      return {
        props: {
          project: data.project,
        },
      };
    } catch (err) {
      return { props: { errors: err.message } };
    }
  return {
    props: {},
  };
};

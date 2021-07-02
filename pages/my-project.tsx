import React from "react";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectContainer } from "../components/ProjectContainer";
import { GET_MY_PROJECTS } from "../interfaces/Project";
import { GetServerSideProps } from "next";
import { css } from "@emotion/react";
import { Grid } from "@material-ui/core";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import {
  GetMyProjectsQuery,
  GetMyProjectsQueryVariables,
} from "../types/graphql";

// TODO サーバーからプロジェクトを取得できたらそこから型を指定する
type IndexPageProps = {
  uid?: string;
  userParticipants?: GetMyProjectsQuery["userParticipants"]["nodes"];
  errors?: string;
};

const container = css`
  padding: 30px 130px;
`;

const title = css`
  font-size: 28px;
  font-weight: bold;
`;

const gridFlex = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const IndexPage = ({
  uid,
  userParticipants,

  errors,
}: IndexPageProps): JSX.Element => {
  if (errors || !userParticipants) {
    return (
      <Layout>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <React.Fragment>
        <MyHead title="プロジェクトの管理 - Hack Us" />
        <Grid container css={container}>
          <h1 css={title}>プロジェクトの管理</h1>
          <Grid container css={gridFlex}>
            {userParticipants.map((x, index) => {
              if (x?.project?.owner.uid === uid)
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={index}
                    css={{ margin: "30px 60px" }}
                  >
                    <ProjectContainer
                      id={x?.project?.id}
                      uid={uid}
                      name={x?.project.name}
                      description={x?.project.description}
                      languages={x?.project?.languages}
                      startsAt={x?.project?.startsAt}
                      endsAt={x?.project?.endsAt}
                    />
                  </Grid>
                );
            })}
          </Grid>
        </Grid>
      </React.Fragment>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const uid = cookies[uidKeyName] || "";
    const { data } = await apolloClient.query<
      GetMyProjectsQuery,
      GetMyProjectsQueryVariables
    >({
      query: GET_MY_PROJECTS,
      variables: {
        uid: uid,
      },
      fetchPolicy: "no-cache",
    });
    return {
      props: {
        uid: uid,
        userParticipants: data.userParticipants.nodes,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

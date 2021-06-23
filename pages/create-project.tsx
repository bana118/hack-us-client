import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectForm } from "../components/ProjectForm";
import { css } from "@emotion/react";
import { GetUserQuery, GetUserQueryVariables, User } from "../types/graphql";
import { apolloClient } from "../utils/apollo-client";
import { GET_USER } from "../interfaces/User";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";

const title = css`
  margin: 30px;
`;

type Props = {
  user?: Pick<
    User,
    "name" | "uid" | "description" | "githubId" | "githubIconUrl"
  >;
  errors?: string;
};

const createProject = (props: Props): JSX.Element => {
  if (props.errors) {
    return (
      <Layout>
        <p>
          <span style={{ color: "red" }}>Error:</span> {props.errors}
        </p>
      </Layout>
    );
  }
  return (
    <Layout>
      <MyHead title="プロジェクトの作成 - Hack Us"></MyHead>
      <h1 css={title}>プロジェクトの作成</h1>
      <ProjectForm />
    </Layout>
  );
};

export default createProject;
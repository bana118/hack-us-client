import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { UserContainer } from "../../components/UserContainer";
import { GET_USER } from "../../interfaces/User";
import { GetUserQuery, GetUserQueryVariables } from "../../types/graphql";
import { apolloClient } from "../../utils/apollo-client";

type userPageProps = {
  user?: GetUserQuery["user"];
  errors?: string;
};

const userPage = ({ user, errors }: userPageProps): JSX.Element => {
  if (errors || !user) {
    return (
      <Layout>
        <MyHead title="Error"></MyHead>
        <p>
          <span style={{ color: "red" }}>
            Error: {errors || "Unexpected Error"}
          </span>
        </p>
      </Layout>
    );
  }

  return (
    <React.Fragment>
      {user != null && (
        <Layout>
          <MyHead title={`${user.name}のプロフィール`} />
          <UserContainer user={user} />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default userPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;
  if (uid == null || Array.isArray(uid)) {
    return { props: { errors: "Invalid URL" } };
  } else {
    try {
      const { data } = await apolloClient.query<
        GetUserQuery,
        GetUserQueryVariables
      >({
        query: GET_USER,
        variables: {
          uid: uid,
        },
        fetchPolicy: "no-cache",
      });

      return {
        props: {
          user: data.user,
        },
      };
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

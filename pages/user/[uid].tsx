import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { UserContainer } from "../../components/UserContainer";
import { GET_ME_AND_USER } from "../../interfaces/User";
import {
  GetMeAndUserQuery,
  GetMeAndUserQueryVariables,
} from "../../types/graphql";
import { apolloClient } from "../../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../../utils/cookie-key-names";

type userPageProps = {
  me?: GetMeAndUserQuery["me"];
  user?: GetMeAndUserQuery["user"];
  errors?: string;
};

const userPage = ({ me, user, errors }: userPageProps): JSX.Element => {
  if (errors || !me || !user) {
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
          <UserContainer me={me} user={user} />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default userPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;
  const cookies = nookies.get(context);
  const myUid = cookies[uidKeyName];
  if (uid == null || Array.isArray(uid)) {
    return { props: { errors: "Invalid URL" } };
  } else {
    try {
      const { data } = await apolloClient.query<
        GetMeAndUserQuery,
        GetMeAndUserQueryVariables
      >({
        query: GET_ME_AND_USER,
        variables: {
          myUid: myUid,
          uid: uid,
        },
        fetchPolicy: "no-cache",
      });

      return {
        props: {
          me: data.me,
          user: data.user,
        },
      };
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

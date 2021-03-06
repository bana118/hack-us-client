import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { UserContainer } from "../../components/UserContainer";
import { GET_ME_AND_USER, GET_USER } from "../../interfaces/User";
import {
  GetMeAndUserQuery,
  GetMeAndUserQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from "../../types/graphql";
import { apolloClient } from "../../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../../utils/cookie-key-names";

type userPageProps = {
  me?: GetMeAndUserQuery["me"] | null;
  user?: GetMeAndUserQuery["user"] | GetUserQuery["user"];
  userParticipants?:
    | GetMeAndUserQuery["userParticipants"]["nodes"]
    | GetUserQuery["userParticipants"]["nodes"];
  errors?: string;
};

const userPage = ({
  me,
  user,
  userParticipants,
  errors,
}: userPageProps): JSX.Element => {
  if (errors || me === undefined || !user || !userParticipants) {
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
          <UserContainer
            me={me}
            user={user}
            userParticipants={userParticipants}
          />
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
      const cookies = nookies.get(context);
      const myUid = cookies[uidKeyName] || "";
      if (myUid === "") {
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
            me: null,
            user: data.user,
            userParticipants: data.userParticipants.nodes,
          },
        };
      } else {
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
            userParticipants: data.userParticipants.nodes,
          },
        };
      }
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

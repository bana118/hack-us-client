import { GetServerSideProps } from "next";
import { GetUserQuery, GetUserQueryVariables, User } from "../types/graphql";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { apolloClient } from "../utils/apollo-client";
import { GET_USER } from "../interfaces/User";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";

type ProfilePageProps = {
  user?: User;
  errors?: string;
};

const ProfilePage = ({ user, errors }: ProfilePageProps): JSX.Element => {
  if (errors) {
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
      <MyHead title="ユーザーページ" />
      <h1>ユーザーページ</h1>
      <p>ユーザー情報を表示</p>
      <p>id: {user.id}</p>
      <p>name: {user.name}</p>
      <p>uid: {user.uid}</p>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const uid = cookies[uidKeyName];
    const { data } = await apolloClient.query<
      GetUserQuery,
      GetUserQueryVariables
    >({
      query: GET_USER,
      variables: { uid: uid },
    });
    return { props: { user: data.user } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

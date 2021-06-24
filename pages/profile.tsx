import { GetServerSideProps } from "next";
import { GetUserQuery, GetUserQueryVariables } from "../types/graphql";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { apolloClient } from "../utils/apollo-client";
import { GET_USER } from "../interfaces/User";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import { ProfileForm } from "../components/ProfileForm";

type ProfilePageProps = {
  user?: GetUserQuery["user"];
  errors?: string;
};

const ProfilePage = ({ user, errors }: ProfilePageProps): JSX.Element => {
  if (user == null || errors) {
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
      <ProfileForm user={user} />
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const uid = cookies[uidKeyName];
    // TODO SSR時のclientとのcacheの共有が分からない
    const { data } = await apolloClient.query<
      GetUserQuery,
      GetUserQueryVariables
    >({
      query: GET_USER,
      variables: { uid: uid },
      fetchPolicy: "no-cache",
    });
    return { props: { user: data.user } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

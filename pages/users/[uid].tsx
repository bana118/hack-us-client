import { GetServerSideProps } from "next";
import { GetUserQuery, GetUserQueryVariables, User } from "../../types/graphql";
import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { apolloClient } from "../../utils/apollo-client";
import { GET_USER } from "../../interfaces/User";

type UserPageProps = {
  user?: User;
  errors?: string;
};

const UserPage = ({ user, errors }: UserPageProps): JSX.Element => {
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

export default UserPage;

// TODO 認証情報の確認
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
        variables: { uid: uid },
      });
      return { props: { user: data.user } };
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

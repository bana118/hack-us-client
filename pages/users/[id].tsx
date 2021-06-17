import { GetStaticProps, GetStaticPaths } from "next";
import { User } from "../../types/graphql";
import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";

type Props = {
  item?: User;
  errors?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserPage = ({ item, errors }: Props): JSX.Element => {
  // if (errors) {
  //   return (
  //     <Layout>
  //       <p>
  //         <span style={{ color: "red" }}>Error:</span> {errors}
  //       </p>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <MyHead title="ユーザーページ" />
      <h1>ユーザーページ</h1>
      <p>ユーザー情報を表示</p>
      <p>id: {item.id}</p>
      <p>name: {item.name}</p>
    </Layout>
  );
};

export default UserPage;

// TODO サーバーからユーザー情報の取得
export const getStaticPaths: GetStaticPaths = async () => {
  // const { data } = await apolloClient.query({ query: GET_USERS });
  // const paths = data.users.map((user) => ({
  //   params: { id: user.id.toString() },
  // }));
  const paths = [{ params: { id: "testId" } }];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // try {
  //   const id = params?.id;
  //   const { data } = await apolloClient.query({ query: GET_USERS });
  //   console.log(data);
  //   const item = data.users.find((user) => user.id === id);
  //   return { props: { item } };
  // } catch (err) {
  //   return { props: { errors: err.message } };
  // }
  console.log(params);
  const item = {
    id: "testId",
    name: "test",
  };
  return { props: { item } };
};

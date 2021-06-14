import { GetStaticProps } from "next";
import Link from "next/link";

import { User, GET_USERS } from "../../interfaces/User";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { apolloClient } from "../../utils/apollo-client";

type Props = {
  items: User[];
};

const WithStaticProps = ({ items }: Props): JSX.Element => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const { data } = await apolloClient.query({ query: GET_USERS });
  return {
    props: {
      items: data.users,
    },
  };
};

export default WithStaticProps;

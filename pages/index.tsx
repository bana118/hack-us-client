import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <MyHead title="Hack Us"></MyHead>
      <h1>Top Page</h1>
      <p>おすすめプロジェクトなどを表示する予定</p>
      <Link href="/users/testId">
        <a>ユーザーページ(仮)</a>
      </Link>
    </Layout>
  );
};

export default IndexPage;

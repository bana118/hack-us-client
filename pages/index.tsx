import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";
import { css } from "@emotion/react";

const IndexPage = (): JSX.Element => (
  <Layout>
    <MyHead title="Hack Us"></MyHead>
    <div css>
      <h1>Top Page</h1>
      <p>おすすめプロジェクトなどを表示する予定</p>
      <Link href="/users/testId">
        <a>ユーザーページ(仮)</a>
      </Link>
    </div>
  </Layout>
);

export default IndexPage;

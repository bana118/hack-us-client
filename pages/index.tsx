import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <MyHead title="Hack Us"></MyHead>
      <h1>Top Page</h1>
      <p>おすすめプロジェクトなどを表示する予定</p>
    </Layout>
  );
};

export default IndexPage;

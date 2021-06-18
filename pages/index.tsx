import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";
import { ProjectComp } from "../components/Project";
import { Project } from "../interfaces/Project";
import { css } from "@emotion/react";
import { GetStaticProps, GetStaticPaths } from "next";

const IndexPage = ({ item }): JSX.Element => (
  <Layout>
    <MyHead title="Hack Us"></MyHead>
    <div css>
      <h1>Top Page</h1>
      {/* <p>おすすめプロジェクトなどを表示する予定</p> */}
      <ProjectComp
        id={item.id}
        name={item.name}
        detail={item.detail}
        status={item.status}
      />
      <Link href="/users/testId">
        <a>ユーザーページ(仮)</a>
      </Link>
    </div>
  </Layout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = () => {
  // try {
  //   const id = params?.id;
  //   const { data } = await apolloClient.query({ query: GET_USERS });
  //   console.log(data);
  //   const item = data.users.find((user) => user.id === id);
  //   return { props: { item } };
  // } catch (err) {
  //   return { props: { errors: err.message } };
  // }
  console.log("log getStaticProps");
  const item: Project = {
    id: "testId",
    name: "testProject",
    detail: "testDetail",
    status: "testNow",
  };
  return { props: { item } };
};

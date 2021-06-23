import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";
import { ProjectComp } from "../components/Project";
import { Project } from "../interfaces/Project";
import { GetStaticProps, GetStaticPaths } from "next";
import { Container, Box } from "@material-ui/core";
import MyTabs from "../components/MyTabs";

const IndexPage = ({ item }): JSX.Element => (
  <Layout>
    <MyHead title="Hack Us"></MyHead>
    <Box>
      {/* <p>おすすめプロジェクトなどを表示する予定</p> */}
      <MyTabs labels={["New Projects", "Likes", "My Projects"]}>
        <Container className="newProjects">
          {item.map((x, idx) => {
            return (
              <ProjectComp
                key={idx}
                id={x.id}
                name={x.name}
                detail={x.detail}
                status={x.status}
              />
            );
          })}
        </Container>
        <Container className="Likes">
          <ProjectComp
            id={item[0].id}
            name={item[0].name}
            detail={item[0].detail}
            status={item[0].status}
          />
        </Container>
        <Container className="myProjects">
          <ProjectComp
            id={item[0].id}
            name={item[0].name}
            detail={item[0].detail}
            status={item[0].status}
          />
        </Container>
      </MyTabs>

      <Link href="/users/testId">
        <a>ユーザーページ(仮)</a>
      </Link>
    </Box>
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
  const item: Array<Project> = [
    {
      id: "testId",
      name: "testProject",
      detail: "testDetail",
      status: "testNow",
    },
    {
      id: "testId",
      name: "testProject",
      detail: "testDetail",
      status: "testNow",
    },
  ];
  return { props: { item } };
};

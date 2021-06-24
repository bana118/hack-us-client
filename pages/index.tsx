import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";
import { ProjectComp } from "../components/Project";
import { Project } from "../interfaces/Project";
import { GetStaticProps } from "next";
import { Container, Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";

// TODO サーバーからプロジェクトを取得できたらそこから型を指定する
type IndexPageProps = {
  item: Project[];
};

const IndexPage = ({ item }: IndexPageProps): JSX.Element => (
  <Layout>
    <MyHead title="Hack Us"></MyHead>
    <Box>
      {/* <p>おすすめプロジェクトなどを表示する予定</p> */}
      <MyTabs labels={["New Projects", "Likes", "My Projects"]}>
        <Grid container>
          {item.map((x, idx) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={idx}>
                <ProjectComp
                  id={x.id}
                  name={x.name}
                  detail={x.detail}
                  status={x.status}
                />
              </Grid>
            );
          })}
        </Grid>
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
    {
      id: "testId",
      name: "testProject",
      detail: "testDetail",
      status: "testNow",
    },
  ];
  return { props: { item } };
};

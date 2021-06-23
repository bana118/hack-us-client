import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import Link from "next/link";
import { ProjectComp } from "../components/Project";
import { Project, GET_USER_PARTICIPANTS } from "../interfaces/Project";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Container, Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";

const IndexPage = ({ newProjectsItem }): JSX.Element => {
  return (
    <Layout>
      <MyHead title="Hack Us"></MyHead>
      <Box>
        {/* <p>おすすめプロジェクトなどを表示する予定</p> */}
        <MyTabs labels={["New Projects", "Likes", "My Projects"]}>
          <Grid container className="newProjects">
            {newProjectsItem.map((x, idx) => {
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
          <Container className="likes">
            <ProjectComp
              id={newProjectsItem[0].id}
              name={newProjectsItem[0].name}
              detail={newProjectsItem[0].detail}
              status={newProjectsItem[0].status}
            />
          </Container>
          <Grid container className="myProjects">
            {newProjectsItem.map((x, idx) => {
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
        </MyTabs>

        <Link href="/users/testId">
          <a>ユーザーページ(仮)</a>
        </Link>
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const cookies = nookies.get(context);
  const uid = cookies[uidKeyName];
  console.log(uid);

  const newProjectsItem: Array<Project> = [
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

  // if (authUser == null) {
  //   return { props: { newProjectsItem } };
  // }

  // try {
  //   const { myProjectsItem } = await apolloClient.query({
  //     query: GET_USER_PARTICIPANTS,
  //     variables: { uid: authUser.uid },
  //     fetchPolicy: "no-cache",
  //   });
  //   return { props: { newProjectsItem, myProjectsItem } };
  // } catch (err) {
  //   console.log(err);
  // }

  return { props: { newProjectsItem } };
};

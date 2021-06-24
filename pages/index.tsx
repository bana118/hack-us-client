import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectComp } from "../components/Project";
import { Project, GET_USER_PARTICIPANTS } from "../interfaces/Project";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Container, Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import {
  GetUserParticipantsQuery,
  GetUserParticipantsQueryVariables,
  Participant,
} from "../types/graphql";

// TODO サーバーからプロジェクトを取得できたらそこから型を指定する
type IndexPageProps = {
  newProjectsItem: Project[];
};

const IndexPage = ({ newProjectsItem }: IndexPageProps): JSX.Element => {
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

  if (uid.length == 0) {
    return { props: { newProjectsItem } };
  }

  try {
    const { data } = await apolloClient.query<
      GetUserParticipantsQuery,
      GetUserParticipantsQueryVariables
    >({
      query: GET_USER_PARTICIPANTS,
      variables: { uid: uid },
      fetchPolicy: "no-cache",
    });
    console.log(data);
    // return { props: { newProjectsItem, myProjectsItem.userParticipants } };
  } catch (err) {
    console.log(err);
  }

  return { props: { newProjectsItem } };
};

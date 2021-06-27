import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectComp } from "../components/Project";
import { GET_USER_PARTICIPANTS } from "../interfaces/Project";
import { GET_USER } from "../interfaces/User";
import { GetServerSideProps } from "next";
import { Container, Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import {
  GetUserParticipantsQuery,
  GetUserParticipantsQueryVariables,
  Participant,
  Project,
  User,
} from "../types/graphql";

// TODO サーバーからプロジェクトを取得できたらそこから型を指定する
type IndexPageProps = {
  newProjectsItem: Project[];
  myProjectsItem: Participant[];
};

const IndexPage = ({
  newProjectsItem,
  myProjectsItem,
}: IndexPageProps): JSX.Element => {
  // const { user } = useContext(AuthContext);

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
                    description={x.description}
                    createdAt={x.createdAt}
                    owner={x.owner}
                    updatedAt={x.updatedAt}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Container className="likes">
            {/* <ProjectComp
              id={newProjectsItem[0].id}
              name={newProjectsItem[0].name}
              description={newProjectsItem[0].description}
              createdAt={newProjectsItem[0].createdAt}
              owner={newProjectsItem[0].owner}
              updatedAt={newProjectsItem[0].updatedAt}
            /> */}
          </Container>
          <Grid container className="myProjects">
            {myProjectsItem.map((x, idx) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={idx}>
                  <ProjectComp
                    id={x.project.id}
                    name={x.project.name}
                    description={x.project.description}
                    createdAt={x.project.createdAt}
                    owner={x.project.owner}
                    updatedAt={x.project.updatedAt}
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
  console.log(typeof uid);

  if (uid == null || uid.length == 0) {
    const noObject: Array<Project> = [];
    return {
      props: { newProjectsItem: noObject, myProjectsItem: noObject },
    };
  }

  const testUser: User = {
    // contributionInfo: "test",
    createdAt: "test",
    description: "test",
    githubIconUrl: "test",
    githubId: "test",
    id: "test",
    name: "test",
    uid: "test",
    updatedAt: "test",
  };

  const newProjectsItem: Array<Project> = [
    {
      contribution: "test",
      createdAt: "test",
      description: "test",
      endsAt: "test",
      githubUrl: "test",
      id: "test",
      name: "test",
      owner: testUser,
      // recruitmentNumbers: 2,
      startsAt: "test",
      // languages: [],
      toolLink: "test",
      updatedAt: "test",
    },
  ];

  try {
    const { data } = await apolloClient.query<
      GetUserParticipantsQuery,
      GetUserParticipantsQueryVariables
    >({
      query: GET_USER_PARTICIPANTS,
      variables: { uid: uid },
      fetchPolicy: "no-cache",
    });
    console.log(data.userParticipants.nodes);
    return {
      props: {
        newProjectsItem: newProjectsItem,
        myProjectsItem: data.userParticipants.nodes,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return { props: { newProjectsItem } };
};

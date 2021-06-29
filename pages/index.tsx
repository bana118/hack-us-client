import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectContainer } from "../components/ProjectContainer";
import { GET_PROJECTS } from "../interfaces/Project";
import { GetServerSideProps } from "next";
import { Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import { GetProjectsQuery, GetProjectsQueryVariables } from "../types/graphql";

// TODO サーバーからプロジェクトを取得できたらそこから型を指定する
type IndexPageProps = {
  uid?: string;
  projects?: GetProjectsQuery["projects"]["nodes"];
  userParticipants?: GetProjectsQuery["userParticipants"]["nodes"];
  userFavorits?: GetProjectsQuery["userFavorites"]["nodes"];
  errors?: string;
};

const IndexPage = ({
  uid,
  projects,
  userParticipants,
  userFavorits,
  errors,
}: IndexPageProps): JSX.Element => {
  console.log(userFavorits);

  const isFavorite = (id: string | undefined) => {
    if (userFavorits?.length !== 0) {
      return userFavorits?.some((item) => item?.project.id === id);
    }

    return false;
  };

  if (errors || !projects || !userParticipants || !userFavorits) {
    return (
      <Layout>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <MyHead title="Hack Us"></MyHead>
      <Box>
        <MyTabs
          labels={[
            "New Projects",
            "Favorite Projects",
            "Participating Projects",
          ]}
        >
          <Grid container className="new-projects">
            {projects.map((project, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <ProjectContainer
                    id={project?.id}
                    uid={uid}
                    favorite={isFavorite(project?.id)}
                    name={project?.name}
                    description={project?.description}
                    languages={project?.languages}
                    startsAt={project?.startsAt}
                    endsAt={project?.endsAt}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container className="favorite-projects">
            {userFavorits.map((userFavorite, index) => {
              const project = userFavorite?.project;
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <ProjectContainer
                    id={project?.id}
                    uid={uid}
                    favorite={true}
                    name={project?.name}
                    description={project?.description}
                    languages={project?.languages}
                    startsAt={project?.startsAt}
                    endsAt={project?.endsAt}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container className="participanting-projects">
            {userParticipants.map((userParticipant, index) => {
              const project = userParticipant?.project;
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <ProjectContainer
                    id={project?.id}
                    uid={uid}
                    favorite={isFavorite(project?.id)}
                    name={project?.name}
                    description={project?.description}
                    languages={project?.languages}
                    startsAt={project?.startsAt}
                    endsAt={project?.endsAt}
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
  try {
    const cookies = nookies.get(context);
    const uid = cookies[uidKeyName];
    const { data } = await apolloClient.query<
      GetProjectsQuery,
      GetProjectsQueryVariables
    >({
      query: GET_PROJECTS,
      variables: {
        uid: uid,
        projectsFirst: 8,
        userParticipantsFirst: 8,
        userFavoritsFirst: 8,
      },
      fetchPolicy: "no-cache",
    });
    console.log(data);
    return {
      props: {
        uid: uid,
        projects: data.projects.nodes,
        userParticipants: data.userParticipants.nodes,
        userFavorits: data.userFavorites.nodes,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

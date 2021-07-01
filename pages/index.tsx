import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProjectContainer } from "../components/ProjectContainer";
import { GET_PROJECTS, isFavorite } from "../interfaces/Project";
import { GetServerSideProps } from "next";
import { Box, Grid } from "@material-ui/core";
import MyTabs from "../components/MyTabs";
import { apolloClient } from "../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import { GetProjectsQuery, GetProjectsQueryVariables } from "../types/graphql";
import Link from "next/link";

type IndexPageProps = {
  uid?: string;
  projects?: GetProjectsQuery["projects"]["nodes"];
  recommends?: GetProjectsQuery["recommends"];
  userParticipants?: GetProjectsQuery["userParticipants"]["nodes"];
  userFavorites?: GetProjectsQuery["userFavorites"]["nodes"];
  errors?: string;
};

const IndexPage = ({
  uid,
  projects,
  recommends,
  userParticipants,
  userFavorites,
  errors,
}: IndexPageProps): JSX.Element => {
  if (
    errors ||
    !projects ||
    !recommends ||
    !userParticipants ||
    !userFavorites
  ) {
    return (
      <Layout>
        <p>
          <span style={{ color: "red" }}>Error:</span>{" "}
          {errors || "Unexpected Error"}
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
            "Recommend Projects",
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
                    favorite={isFavorite(project?.id, userFavorites)}
                    name={project?.name}
                    description={project?.description}
                    languages={project?.languages}
                    startsAt={project?.startsAt}
                    endsAt={project?.endsAt}
                    contribution={project?.contribution}
                    recruitmentNumbers={project?.recruitmentNumbers}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container className="recommend-projects">
            {recommends.map((recommend, index) => {
              return (
                <Grid key={index} container direction="column">
                  <Grid item>
                    <h2>{recommend.language}</h2>
                    <Link href={`/search/${recommend.language}`}>
                      <a>more</a>
                    </Link>
                  </Grid>
                  <Grid item>
                    {recommend.projects.map((project, index) => {
                      return (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                          <ProjectContainer
                            id={project?.id}
                            uid={uid}
                            favorite={isFavorite(project?.id, userFavorites)}
                            name={project?.name}
                            description={project?.description}
                            languages={project?.languages}
                            startsAt={project?.startsAt}
                            endsAt={project?.endsAt}
                            contribution={project?.contribution}
                            recruitmentNumbers={project?.recruitmentNumbers}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid container className="favorite-projects">
            {userFavorites.map((userFavorite, index) => {
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
                    contribution={project?.contribution}
                    recruitmentNumbers={project?.recruitmentNumbers}
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
                    favorite={isFavorite(project?.id, userFavorites)}
                    name={project?.name}
                    description={project?.description}
                    languages={project?.languages}
                    startsAt={project?.startsAt}
                    endsAt={project?.endsAt}
                    contribution={project?.contribution}
                    recruitmentNumbers={project?.recruitmentNumbers}
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
        recommendsLanguageFirst: 5,
        recommendsProjectFirst: 3,
      },
      fetchPolicy: "no-cache",
    });
    return {
      props: {
        uid: uid,
        projects: data.projects.nodes,
        recommends: data.recommends,
        userParticipants: data.userParticipants.nodes,
        userFavorites: data.userFavorites.nodes,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

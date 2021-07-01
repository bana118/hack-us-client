import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { SEARCH_PROJECTS } from "../../interfaces/Project";
import {
  SearchProjectsQuery,
  SearchProjectsQueryVariables,
  useSearchProjectsLazyQuery,
} from "../../types/graphql";
import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { ProjectContainer } from "../../components/ProjectContainer";
import { AuthContext } from "../../context/AuthContext";
import { apolloClient } from "../../utils/apollo-client";

type SearchProjectPageProps = {
  query?: string;
  firstProjects?: SearchProjectsQuery["projects"];
  errors?: string;
};

const SearchProjectPage = ({
  query,
  firstProjects,
  errors,
}: SearchProjectPageProps): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState(firstProjects);
  const [requireLoad, setRequireLoad] = useState(false);
  const [loadProjects, { data }] = useSearchProjectsLazyQuery();

  useEffect(() => {
    const requestLoad = () => {
      if (
        typeof window !== "undefined" &&
        window.pageYOffset + window.innerHeight === document.body.clientHeight
      ) {
        setRequireLoad(true);
      }
    };
    window.addEventListener("scroll", requestLoad);
    return () => {
      window.removeEventListener("scroll", requestLoad);
    };
  }, []);

  useEffect(() => {
    if (requireLoad && projects?.pageInfo.hasNextPage) {
      loadProjects({
        variables: {
          query: query || "",
          first: 20,
          after: projects?.pageInfo.endCursor,
        },
      });
    }
    // projects, queryの変化のときは実行しない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requireLoad]);

  useEffect(() => {
    if (data != null) {
      setProjects(data.projects);
    }

    setRequireLoad(false);
  }, [data]);

  if (errors || !firstProjects) {
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
      <h1>「{query}」の検索結果</h1>
      {projects?.edges && user && (
        <Grid container>
          {projects?.edges.map((project, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ProjectContainer
                  id={project?.node?.id}
                  uid={user.uid}
                  // TODO favorite情報の取り方
                  favorite={false}
                  name={project?.node?.name}
                  description={project?.node?.description}
                  languages={project?.node?.languages}
                  startsAt={project?.node?.startsAt}
                  endsAt={project?.node?.endsAt}
                  contribution={project?.node?.contribution}
                  recruitmentNumbers={project?.node?.recruitmentNumbers}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Layout>
  );
};

export default SearchProjectPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  if (query == null || Array.isArray(query)) {
    return { props: { errors: "Invalid URL" } };
  } else {
    try {
      const { data } = await apolloClient.query<
        SearchProjectsQuery,
        SearchProjectsQueryVariables
      >({
        query: SEARCH_PROJECTS,
        variables: {
          query: query,
          first: 20,
        },
        fetchPolicy: "no-cache",
      });
      console.log(data.projects);
      return {
        props: {
          query: query,
          firstProjects: data.projects,
        },
      };
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

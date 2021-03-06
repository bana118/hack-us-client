import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { SearchInput } from "../../components/SearchInput";
import { GetServerSideProps } from "next";
import {
  SEARCH_PROJECTS_FIRST_WITH_FAVORITES,
  isFavorite,
  SEARCH_PROJECTS_FIRST,
} from "../../interfaces/Project";
import {
  SearchProjectsFirstQuery,
  SearchProjectsFirstQueryVariables,
  SearchProjectsFirstWithFavoritesQuery,
  SearchProjectsFirstWithFavoritesQueryVariables,
  useSearchProjectsLazyQuery,
} from "../../types/graphql";
import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { ProjectContainer } from "../../components/ProjectContainer";
import { AuthContext } from "../../context/AuthContext";
import { apolloClient } from "../../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../../utils/cookie-key-names";
import { css } from "@emotion/react";

type SearchProjectPageProps = {
  query?: string;
  firstProjects?:
    | SearchProjectsFirstWithFavoritesQuery["projects"]
    | SearchProjectsFirstQuery["projects"];
  userFavorites?: SearchProjectsFirstWithFavoritesQuery["userFavorites"]["nodes"];
  errors?: string;
};

const container = css`
  padding: 30px 130px;
`;

const title = css`
  font-size: 28px;
  font-weight: bold;
`;

const gridFlex = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SearchProjectPage = ({
  query,
  firstProjects,
  userFavorites,
  errors,
}: SearchProjectPageProps): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState(firstProjects?.edges);
  const [pageInfo, setPageInfo] = useState(firstProjects?.pageInfo);
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
    if (requireLoad && pageInfo?.hasNextPage) {
      loadProjects({
        variables: {
          query: query || "",
          first: 20,
          after: pageInfo.endCursor,
        },
      });
    }
    // pageInfo, query????????????????????????????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requireLoad]);

  useEffect(() => {
    if (data != null && projects != null) {
      setProjects(data.projects.edges?.concat(projects));
      setPageInfo(data.projects.pageInfo);
    }
    setRequireLoad(false);
    // projects?????????????????????????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (errors || !firstProjects) {
    return (
      <Layout>
        <MyHead title="Error"></MyHead>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }
  return (
    <Layout showSearch={false}>
      <MyHead title={`???${query}?????????????????? - Hack Us`} />
      <SearchInput />
      <Grid container css={container}>
        <h1 css={title}>???{query}??????????????????</h1>
        {projects && (
          <Grid container css={gridFlex}>
            {projects.map((project, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={index}
                  css={{ margin: 30 }}
                >
                  <ProjectContainer
                    id={project?.node?.id}
                    uid={user?.uid}
                    favorite={isFavorite(project?.node?.id, userFavorites)}
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
      </Grid>
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
      const cookies = nookies.get(context);
      const uid = cookies[uidKeyName] || "";
      if (uid === "") {
        const { data } = await apolloClient.query<
          SearchProjectsFirstQuery,
          SearchProjectsFirstQueryVariables
        >({
          query: SEARCH_PROJECTS_FIRST,
          variables: {
            query: query,
            first: 20,
          },
          fetchPolicy: "no-cache",
        });

        return {
          props: {
            query: query,
            firstProjects: data.projects,
            userFavorites: [],
          },
        };
      } else {
        const { data } = await apolloClient.query<
          SearchProjectsFirstWithFavoritesQuery,
          SearchProjectsFirstWithFavoritesQueryVariables
        >({
          query: SEARCH_PROJECTS_FIRST_WITH_FAVORITES,
          variables: {
            uid: uid,
            query: query,
            first: 20,
          },
          fetchPolicy: "no-cache",
        });

        return {
          props: {
            query: query,
            firstProjects: data.projects,
            userFavorites: data.userFavorites.nodes,
          },
        };
      }
    } catch (err) {
      return { props: { errors: err.message } };
    }
  }
};

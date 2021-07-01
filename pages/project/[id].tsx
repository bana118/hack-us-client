import Layout from "../../components/Layout";
import { FavoriteButton } from "../../components/FavoriteButton";
import { Container, List, ListItem, Link, Button } from "@material-ui/core";
import { css } from "@emotion/react";
import { GetServerSideProps } from "next";
import { apolloClient } from "../../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../../utils/cookie-key-names";
import { GET_PROJECTS } from "../../interfaces/Project";
import {
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from "../../types/graphql";

const projectDetailStyle = css`
  background-color: #ffffff;
  width: 80vw;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-flow: row;
`;

const titleStyle = css`
  margin-left: 3vw;
`;

const subTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 20px;
  margin: 0;
`;

const paragraphStyle = css`
  padding-left: 40px;
`;

const linkTitle = css`
  font-size: 14px;
  color: #3e74e8;
  cursor: pointer;
`;

const button = css`
  border-radius: 100px;
  height: 64px;
  margin-left: 40%;
  margin-right: 40%;
  min-width: 200px;
`;

const buttonStyle = css``;

type ProjectDetailProps = {
  uid?: string;
  projectId?: string;
  projects?: GetProjectsQuery["projects"]["nodes"];
  userParticipants?: GetProjectsQuery["userParticipants"]["nodes"];
  userFavorits?: GetProjectsQuery["userFavorites"]["nodes"];
  errors?: string;
};

const ProjectDetail = ({
  uid,
  projectId,
  projects,
  userParticipants,
  userFavorits,
  errors,
}: ProjectDetailProps): JSX.Element => {
  if (errors) {
    return (
      <Layout>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  const isFavorite = (id: string | undefined) => {
    if (userFavorits?.length !== 0) {
      return userFavorits?.some((item) => item?.project.id === id);
    }

    return false;
  };

  const targetProject = projects?.find((v) => v?.id === projectId);

  if (!userParticipants?.find((v) => v?.project.id == projectId)) {
    return (
      //  not participant layout
      <Layout>
        <h1 css={titleStyle}>Detail Project</h1>
        <Container css={projectDetailStyle}>
          <Container>
            <p css={subTitleStyle}>{targetProject?.name}</p>
            <p css={paragraphStyle}>
              開発期間: {new Date(targetProject?.startsAt).toLocaleDateString()}{" "}
              ~ {new Date(targetProject?.endsAt).toLocaleDateString()}
            </p>
            <h2 css={subTitleStyle}>プロジェクトの説明</h2>
            <p css={paragraphStyle}>{targetProject?.description}</p>
            <h2 css={subTitleStyle}>使用言語</h2>
            <List>
              {targetProject?.languages.map((language, index) => {
                return (
                  <ListItem css={paragraphStyle} key={index}>
                    ・{language.name}
                  </ListItem>
                );
              })}
            </List>
            <h2 css={subTitleStyle}>募集人数</h2>
            <p css={paragraphStyle}>{targetProject?.recruitmentNumbers}</p>
            <h2 css={subTitleStyle}>コントリビュートの方法</h2>
            <p css={paragraphStyle}>{targetProject?.contribution}</p>

            <Button css={button} type="submit" variant="contained">
              プロジェクトに応募する
            </Button>
          </Container>
          <FavoriteButton
            css={buttonStyle}
            id={projectId}
            uid={uid}
            favorite={isFavorite(projectId)}
          />
        </Container>
        <Link href="/">
          <div css={linkTitle}>&#65124; ホームに戻る</div>
        </Link>
      </Layout>
    );
  } else {
    //  true participant layout
    return (
      <Layout>
        <h1 css={titleStyle}>Detail Project</h1>
        <Container css={projectDetailStyle}>
          <Container>
            <p css={subTitleStyle}>{targetProject?.name}</p>
            <p css={paragraphStyle}>
              開発期間: {new Date(targetProject?.startsAt).toLocaleDateString()}{" "}
              ~ {new Date(targetProject?.endsAt).toLocaleDateString()}
            </p>
            <h2 css={subTitleStyle}>プロジェクトの説明</h2>
            <p css={paragraphStyle}>{targetProject?.description}</p>
            <h2 css={subTitleStyle}>Discordのリンク</h2>
            <p css={paragraphStyle}>{targetProject?.toolLink}</p>
            <h2 css={subTitleStyle}>参加者</h2>
            <p css={paragraphStyle}>いない</p>
            <h2 css={subTitleStyle}>使用言語</h2>
            <List>
              {targetProject?.languages.map((language, index) => {
                return (
                  <ListItem css={paragraphStyle} key={index}>
                    ・{language.name}
                  </ListItem>
                );
              })}
            </List>
            <h2 css={subTitleStyle}>コントリビュートの方法</h2>
            <p css={paragraphStyle}>{targetProject?.contribution}</p>
          </Container>
          <FavoriteButton
            css={buttonStyle}
            id={projectId}
            uid={uid}
            favorite={isFavorite(projectId)}
          />
        </Container>
        <Link href="/">
          <div css={linkTitle}>&#65124; ホームに戻る</div>
        </Link>
      </Layout>
    );
  }
};

export default ProjectDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const uid = cookies[uidKeyName];
  console.log("log: ", context.query);
  console.log("hello");

  try {
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
        projectId: context.query.id,
        projects: data.projects.nodes,
        userParticipants: data.userParticipants.nodes,
        userFavorits: data.userFavorites.nodes,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

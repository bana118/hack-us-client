import Layout from "../../components/Layout";
import { MyHead } from "../../components/MyHead";
import { FavoriteButton } from "../../components/FavoriteButton";
import { Container, List, ListItem, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { GetServerSideProps } from "next";
import { apolloClient } from "../../utils/apollo-client";
import nookies from "nookies";
import { uidKeyName } from "../../utils/cookie-key-names";
import {
  GET_PROJECT_AND_PARTICIPANT_AND_FAVORITE,
  isFavorite,
} from "../../interfaces/Project";
import {
  GetRecommendUsersQuery,
  GetRecommendUsersQueryVariables,
  GetProjectAndParticipantAndFavoriteQuery,
  GetProjectAndParticipantAndFavoriteQueryVariables,
} from "../../types/graphql";
import { GET_RECOMMEND_USERS } from "../../interfaces/User";
import { useCreateParticipantMutation } from "../../types/graphql";
import {
  themeMain,
  textBlack,
  textGrey,
  textLinkblue,
  border,
} from "../../utils/style-variables";
import Link from "next/link";
import React from "react";

const projectDetailStyle = css`
  background-color: #ffffff;
  width: 80vw;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  padding: 30px;
  display: flex;
  flex-flow: row;
  border-radius: 10px;
`;

const titleStyle = css`
  margin-left: 130px;
`;

const subTitleStyle = css`
  font-size: 28px;
  color: ${textBlack};
  font-weight: bold;
  padding: 20px;
  padding-bottom: 10px;
  margin: 0;
  border-bottom: 1px solid ${border};
`;

const paragraphStyle = css`
  font-size: 14px;
  color: ${textGrey};
  padding-left: 40px;
`;

const linkTitle = css`
  font-size: 14px;
  color: ${textLinkblue};
  cursor: pointer;
  margin: 30px 0;
`;

const button = css`
  border-radius: 100px;
  background-color: ${themeMain};
  height: 64px;
  margin: 60px 40%;
  min-width: 200px;
`;

const buttonStyle = css``;

type ProjectDetailProps = {
  uid?: string;
  project?: GetProjectAndParticipantAndFavoriteQuery["project"];
  userParticipants?: GetProjectAndParticipantAndFavoriteQuery["userParticipants"]["nodes"];
  userFavorites?: GetProjectAndParticipantAndFavoriteQuery["userFavorites"]["nodes"];
  projectParticipants?: GetProjectAndParticipantAndFavoriteQuery["projectParticipants"]["nodes"];
  recommendUsers?: GetRecommendUsersQuery;
  errors?: string;
};

const ProjectDetail = ({
  uid = "",
  project,
  userParticipants,
  userFavorites,
  projectParticipants,
  recommendUsers,
  errors,
}: ProjectDetailProps): JSX.Element => {
  const [createParticipantMutation] = useCreateParticipantMutation();
  const router = useRouter();

  if (errors) {
    return (
      <Layout>
        <MyHead title="Error" />
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  const ClickApplyButton = async () => {
    try {
      const result = await createParticipantMutation({
        variables: {
          uid: uid,
          projectId: project?.id || "",
          // TODO ownerApproved はfalseにして承認待ちにする
          ownerApproved: true,
          userApproved: true,
        },
      });
      console.log(result);
      router.push({
        pathname: "/project/[id]",
        query: { id: project?.id },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const targetProject = project;
  const isOwner = targetProject?.owner.uid === uid;

  const recommendUserList: {
    uid: string | undefined;
    name: string | undefined;
  }[] = [];
  if (recommendUsers?.language1.nodes != null) {
    for (const user of recommendUsers.language1.nodes) {
      if (
        user?.uid != null &&
        targetProject?.owner.uid !== user?.uid &&
        !recommendUserList.some((u) => u.uid === user?.uid)
      ) {
        recommendUserList.push({ uid: user?.uid, name: user?.name });
      }
    }
  }
  if (recommendUsers?.language2.nodes != null) {
    for (const user of recommendUsers.language2.nodes) {
      if (
        user?.uid != null &&
        targetProject?.owner.uid !== user?.uid &&
        !recommendUserList.some((u) => u.uid === user?.uid)
      ) {
        recommendUserList.push({ uid: user?.uid, name: user?.name });
      }
    }
  }
  if (recommendUsers?.language3.nodes != null) {
    for (const user of recommendUsers.language3.nodes) {
      if (
        user?.uid != null &&
        targetProject?.owner.uid !== user?.uid &&
        !recommendUserList.some((u) => u.uid === user?.uid)
      ) {
        recommendUserList.push({ uid: user?.uid, name: user?.name });
      }
    }
  }

  if (!userParticipants?.find((v) => v?.project.id == project?.id)) {
    return (
      //  not participant layout
      <Layout>
        <MyHead title={`${targetProject?.name} - Hack Us`} />
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
              {targetProject?.languages &&
                targetProject?.languages.map((language, index) => {
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

            <Button
              css={button}
              type="submit"
              variant="contained"
              onClick={ClickApplyButton}
            >
              プロジェクトに応募する
            </Button>
            <Link href="/" passHref>
              <div css={linkTitle}>&#65124; ホームに戻る</div>
            </Link>
          </Container>
          <FavoriteButton
            css={buttonStyle}
            id={project?.id}
            uid={uid}
            favorite={isFavorite(project?.id, userFavorites)}
          />
        </Container>
      </Layout>
    );
  } else {
    //  true participant layout
    return (
      <Layout>
        <MyHead title={targetProject?.name}></MyHead>
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
            {/* <p css={paragraphStyle}>・{targetProject?.owner.name} (OWNER)</p> */}
            <List>
              <ListItem css={paragraphStyle}>
                ・
                <Link href={`/user/${targetProject?.owner.uid}`}>
                  <a>{targetProject?.owner.name}</a>
                </Link>
                (OWNER)
              </ListItem>
              {projectParticipants?.map((participant, index) => {
                if (participant?.user.uid !== targetProject?.owner.uid) {
                  return (
                    <ListItem css={paragraphStyle} key={index}>
                      ・
                      <Link href={`/user/${participant?.user.name}`}>
                        <a>{participant?.user.name}</a>
                      </Link>
                    </ListItem>
                  );
                }
              })}
            </List>
            <h2 css={subTitleStyle}>使用言語</h2>
            <List>
              {targetProject?.languages &&
                targetProject?.languages.map((language, index) => {
                  return (
                    <ListItem css={paragraphStyle} key={index}>
                      ・{language.name}
                    </ListItem>
                  );
                })}
            </List>
            <h2 css={subTitleStyle}>コントリビュートの方法</h2>
            {isOwner && (
              <React.Fragment>
                <h2 css={subTitleStyle}>おすすめのユーザー</h2>
                <List>
                  {recommendUserList.map((user, index) => {
                    return (
                      <ListItem css={paragraphStyle} key={index}>
                        ・
                        <Link href={`/user/${user?.uid}`}>
                          <a>{user?.name}</a>
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </React.Fragment>
            )}
            <p css={paragraphStyle}>{targetProject?.contribution}</p>
            <Link href="/" passHref>
              <div css={linkTitle}>&#65124; ホームに戻る</div>
            </Link>
          </Container>
          <FavoriteButton
            css={buttonStyle}
            id={project?.id}
            uid={uid}
            favorite={isFavorite(project?.id, userFavorites)}
          />
        </Container>
      </Layout>
    );
  }
};

export default ProjectDetail;

const getRecommendUsers = async (
  language1: string | null,
  language2: string | null,
  language3: string | null
) => {
  const { data } = await apolloClient.query<
    GetRecommendUsersQuery,
    GetRecommendUsersQueryVariables
  >({
    query: GET_RECOMMEND_USERS,
    variables: {
      first: 3,
      language1: language1,
      language2: language2,
      language3: language3,
    },
    fetchPolicy: "no-cache",
  });
  return data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (id == null || Array.isArray(id)) {
    return { props: { errors: "Invalid URL" } };
  }
  const projectId = id;

  const cookies = nookies.get(context);
  const uid = cookies[uidKeyName] || "";

  try {
    const { data } = await apolloClient.query<
      GetProjectAndParticipantAndFavoriteQuery,
      GetProjectAndParticipantAndFavoriteQueryVariables
    >({
      query: GET_PROJECT_AND_PARTICIPANT_AND_FAVORITE,
      variables: {
        id: projectId,
        uid: uid,
      },
      fetchPolicy: "no-cache",
    });
    const project = data.project;
    const userParticipants = data.userParticipants.nodes;
    const userFavorites = data.userFavorites.nodes;
    const projectParticipants = data.projectParticipants.nodes;
    const recommendUsers = await getRecommendUsers(
      project?.languages != null && project?.languages[0]
        ? project.languages[0].name
        : null,
      project?.languages != null && project?.languages[1]
        ? project.languages[1].name
        : null,
      project?.languages != null && project?.languages[2]
        ? project.languages[2].name
        : null
    );

    return {
      props: {
        uid: uid,
        project: project,
        userParticipants: userParticipants,
        userFavorites: userFavorites,
        projectParticipants: projectParticipants,
        recommendUsers: recommendUsers,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

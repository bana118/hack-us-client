import { GetStaticProps, GetStaticPaths } from "next";
import { apolloClient } from "../../utils/apollo-client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, List, ListItem, Link } from "@material-ui/core";
import { css } from "@emotion/react";

const projectDetailStyle = css`
  background-color: #ffffff;
  display-flex;
  flex-flow: column;
  width: 80vw;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const subTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 20px;
`;

const nameStyle = css`
  font-size: 1.5em;
  padding-top: 20px;
  padding-left: 20px;
`;

const paragraphStyle = css`
  padding-left: 20px;
`;

const linkTitle = css`
  font-size: 14px;
  color: #3e74e8;
  cursor: pointer;
`;

const ProjectDetail = (): JSX.Element => {
  const router = useRouter();
  const {
    contribution,
    name,
    description,
    startsAt,
    endsAt,
    recruitmentNumbers,
  } = router.query;
  console.log(router.query);

  return (
    <Layout>
      <Container css={projectDetailStyle}>
        <p css={nameStyle}>{name}</p>
        <p css={paragraphStyle}>
          開発期間: {startsAt} ~ {endsAt}
        </p>
        <h2 css={subTitleStyle}>プロジェクトの説明</h2>
        <p css={paragraphStyle}>{description}</p>
        <h2 css={subTitleStyle}>使用言語</h2>
        <List>
          <ListItem>Java</ListItem>
          <ListItem>Python</ListItem>
          <ListItem>HTML</ListItem>
        </List>
        <h2 css={subTitleStyle}>募集人数</h2>
        <p css={paragraphStyle}>{recruitmentNumbers}</p>
        <h2 css={subTitleStyle}>コントリビュートの方法</h2>
      </Container>
      <Link href="/">
        <div css={linkTitle}>&#65124; ホームに戻る</div>
      </Link>
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const { data } = await apolloClient.query<
//       GetProjectQuery
//     >({
//       query: GET_PROJECT,
//       variables: { id: id },
//       fetchPolicy: "no-cache",
//     });
//     console.log(data.userParticipants.nodes);
//     return {
//       props: {
//         newProjectsItem: newProjectsItem,
//         myProjectsItem: data.userParticipants.nodes,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getStaticProps: GetStaticProps = async () => {
//   return;
// }

export default ProjectDetail;

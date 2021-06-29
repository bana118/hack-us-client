import { GetStaticProps, GetStaticPaths } from "next";
import { GET_PROJECT } from "../../interfaces/Project";
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
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
`;

const nameStyle = css`
  font-size: 1.5em;
`;

const linkTitle = css`
  font-size: 14px;
  color: #3e74e8;
  cursor: pointer;
`;

const ProjectDetail = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router.query);
  const project = router.query;

  return (
    <Layout>
      <Container css={projectDetailStyle}>
        <p css={nameStyle}>{project.name}</p>
        <h2 css={titleStyle}>プロジェクトの説明</h2>
        <p>{project.description}</p>
        <h2 css={titleStyle}>使用言語</h2>
        <List>
          <ListItem>Java</ListItem>
          <ListItem>Python</ListItem>
          <ListItem>HTML</ListItem>
        </List>
        <h2 css={titleStyle}>コントリビュートの方法</h2>
      </Container>
      <Link href="/">
        <a css={linkTitle}>&#65124; ホームに戻る</a>
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

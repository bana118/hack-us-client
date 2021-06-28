import { GetStaticProps, GetStaticPaths } from "next";
import { GET_PROJECT } from "../../interfaces/Project";
import { apolloClient } from "../../utils/apollo-client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const ProjectDetail = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router.query);

  return (
    <Layout>
      <div>{pid}</div>
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

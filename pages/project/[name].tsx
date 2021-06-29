import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, List, ListItem, Link, Button } from "@material-ui/core";
import { css } from "@emotion/react";

const projectDetailStyle = css`
  background-color: #ffffff;
  display-flex;
  flex-flow: column;
  width: 80vw;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  padding-bottom: 20px;
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

type ProjectDetailType = {
  contribution?: string;
  name: string;
  description: string;
  languages: Array<string>;
  startsAt: string;
  endsAt: string;
  recruitmentNumbers: string;
};

const ProjectDetail = (): JSX.Element => {
  const router = useRouter();
  const {
    contribution,
    name,
    description,
    languages,
    startsAt,
    endsAt,
    recruitmentNumbers,
  } = router.query;
  console.log(router.query);

  // avoid undefined error of map function
  const detail: ProjectDetailType = {
    contribution: contribution as string,
    name: name as string,
    description: description as string,
    languages: languages as Array<string>,
    startsAt: startsAt as string,
    endsAt: endsAt as string,
    recruitmentNumbers: recruitmentNumbers as string,
  };

  return (
    <Layout>
      <h1 css={titleStyle}>Detail Project</h1>
      <Container css={projectDetailStyle}>
        <p css={subTitleStyle}>{detail.name}</p>
        <p css={paragraphStyle}>
          開発期間: {new Date(detail.startsAt).toLocaleDateString()} ~{" "}
          {new Date(detail.endsAt).toLocaleDateString()}
        </p>
        <h2 css={subTitleStyle}>プロジェクトの説明</h2>
        <p css={paragraphStyle}>{detail.description}</p>
        <h2 css={subTitleStyle}>使用言語</h2>
        <List>
          {detail.languages.map((language, index) => {
            return (
              <ListItem css={paragraphStyle} key={index}>
                ・{language}
              </ListItem>
            );
          })}
        </List>
        <h2 css={subTitleStyle}>募集人数</h2>
        <p css={paragraphStyle}>{detail.recruitmentNumbers}</p>
        <h2 css={subTitleStyle}>コントリビュートの方法</h2>
        <p css={paragraphStyle}>{detail.contribution}</p>

        <Button css={button} type="submit" variant="contained">
          プロジェクトに応募する
        </Button>
      </Container>
      <Link href="/">
        <div css={linkTitle}>&#65124; ホームに戻る</div>
      </Link>
    </Layout>
  );
};

export default ProjectDetail;

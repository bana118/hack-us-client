import Link from "next/link";
import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { Box, Button, Container, TextField } from "@material-ui/core";
import { css } from "@emotion/react";

const title = css`
  margin: 30px;
`;

const container = css`
  background-color: #ffffff;
  padding: 40px 30px;
`;

const subTitle = css`
  font-size: 20px;
  font-weight: bold;
`;

const linkTitle = css`
  font-size: 14px;
`;

const createProject = (): JSX.Element => {
  return (
    <Layout>
      <MyHead title="プロジェクトの作成 - Hack Us"></MyHead>
      <h1 css={title}>プロジェクトの作成</h1>
      <Container css={container}>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト名</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト概要</h2>
          <TextField fullWidth multiline rows={4} />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>GitHubリポジトリ</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>開発期間</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>使用技術</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>募集人数</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>Discord or Slackのリンク</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={250} sx={{ mx: "auto" }} mb={12.5}>
          <h2 css={subTitle}>コントリビュートの方法</h2>
          <TextField fullWidth variant="standard" />
        </Box>
        <Box css={subTitle} width={250} sx={{ mx: "auto" }} mb={5}>
          <Button variant="contained" size="large" color="primary">
            プロジェクトを作成する
          </Button>
        </Box>
        <Link href="/">
          <a css={linkTitle}>&#65124; ホームに戻る</a>
        </Link>
      </Container>
    </Layout>
  );
};

export default createProject;

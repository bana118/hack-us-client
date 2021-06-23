import { useState, useCallback, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Box, Button, Container, TextField, Tooltip } from "@material-ui/core";
import { CreateProjectMutation } from "../types/graphql";
import { css } from "@emotion/react";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../interfaces/Project";

// type InputsType = {
//   name: string;
//   description: string;
//   githubUrl: string;
//   startsAt: Date;
//   endsAt: Date;
//   technology1: string;
//   technology2: string;
//   technology3: string;
//   technology4: string;
//   technology5: string;
//   recruitmentNumbers: number;
//   toolLink: string;
//   contribution: string;
// };

export const ProjectForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [startsAt, setStartsAt] = useState(new Date());
  const [endsAt, setEndsAt] = useState(new Date());
  const [technology1, SetTechnology1] = useState("");
  const [technology2, SetTechnology2] = useState("");
  const [technology3, SetTechnology3] = useState("");
  const [technology4, SetTechnology4] = useState("");
  const [technology5, SetTechnology5] = useState("");
  const [recruitmentNumbers, setRecruitmentNumbers] = useState(1);
  const [toolLink, setToolLink] = useState("");
  const [contribution, setContribution] = useState("");

  const nameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const descriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  const githubUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
  }, []);

  const startsAtChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStartsAt(new Date(e.target.value));
  }, []);

  const endsAtChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEndsAt(new Date(e.target.value));
  }, []);

  const tecnology1Change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    SetTechnology1(e.target.value);
  }, []);

  const tecnology2Change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    SetTechnology2(e.target.value);
  }, []);

  const tecnology3Change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    SetTechnology3(e.target.value);
  }, []);

  const tecnology4Change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    SetTechnology4(e.target.value);
  }, []);

  const tecnology5Change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    SetTechnology5(e.target.value);
  }, []);

  const recruitmentNumbersChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRecruitmentNumbers(Number(e.target.value));
    },
    []
  );

  const toolLinkChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setToolLink(e.target.value);
  }, []);

  const [updatedTooltipOpen, setUpdatedTooltipOpen] = useState(false);

  const cookies = nookies.get();
  const uid = cookies[uidKeyName];

  const [createProject] = useMutation<CreateProjectMutation>(CREATE_PROJECT, {
    update(cache, { data: { createProject } }) {
      const cacheId = cache.identify(createProject);

      cache.modify({
        fields: {
          projects(existingProjects, { toReference }) {
            return [toReference(cacheId), ...existingProjects];
          },
        },
      });
    },
  });

  const contributionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContribution(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await createProject({
          variables: {
            name: name,
            description: description,
            githubUrl: githubUrl,
            startsAt: startsAt,
            endsAt: endsAt,
            technology1: technology1,
            technology2: technology2,
            technology3: technology3,
            technology4: technology4,
            technology5: technology5,
            recruitmentNumbers: recruitmentNumbers,
            toolLink: toolLink,
            contribution: contribution,
            ownerUid: uid,
          },
        });
        setUpdatedTooltipOpen(true);
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    },
    [
      contribution,
      createProject,
      description,
      endsAt,
      githubUrl,
      name,
      recruitmentNumbers,
      startsAt,
      technology1,
      technology2,
      technology3,
      technology4,
      technology5,
      toolLink,
      uid,
    ]
  );

  const container = css({
    backgroundColor: "#ffffff",
    padding: "40px 30px",
    borderRadius: "10px",
  });

  const subTitle = css({
    fontSize: "20px",
    fontWeight: "bold",
  });

  const tecnologyWidth = css({
    width: "140px",
  });

  const button = css({
    borderRadius: "100px",
    height: "64px",
  });

  const linkTitle = css({
    fontSize: "14px",
    color: "#3e74e8",
    cursor: "pointer",
  });

  return (
    <Container css={container}>
      <form onSubmit={handleSubmit}>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト名</h2>
          <TextField fullWidth variant="standard" onChange={nameChange} />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト概要</h2>
          <TextField
            fullWidth
            multiline
            minRows={5}
            onChange={descriptionChange}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>GitHubリポジトリ</h2>
          <TextField variant="standard" onChange={githubUrlChange} />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>開発期間</h2>
          <Box display="flex">
            <TextField
              type="date"
              variant="standard"
              onChange={startsAtChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span>&#8594;</span>
            <TextField
              type="date"
              onChange={endsAtChange}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>使用技術</h2>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <TextField
              css={tecnologyWidth}
              variant="standard"
              onChange={tecnology1Change}
            />
            <TextField
              css={tecnologyWidth}
              variant="standard"
              onChange={tecnology2Change}
            />
            <TextField
              css={tecnologyWidth}
              variant="standard"
              onChange={tecnology3Change}
            />
            <TextField
              css={tecnologyWidth}
              variant="standard"
              onChange={tecnology4Change}
            />
            <TextField
              css={tecnologyWidth}
              variant="standard"
              onChange={tecnology5Change}
            />
          </Box>
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>募集人数</h2>
          <TextField
            fullWidth
            variant="standard"
            onChange={recruitmentNumbersChange}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>Discord or Slackのリンク</h2>
          <TextField fullWidth variant="standard" onChange={toolLinkChange} />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={12.5}>
          <h2 css={subTitle}>コントリビュートの方法</h2>
          <TextField
            fullWidth
            variant="standard"
            onChange={contributionChange}
          />
        </Box>
        <Box css={subTitle} width={300} sx={{ mx: "auto" }} mb={5}>
          <Tooltip
            title="作成しました！"
            open={updatedTooltipOpen}
            onClose={() => {
              setUpdatedTooltipOpen(false);
            }}
          >
            <Button
              css={button}
              type="submit"
              variant="contained"
              color="primary"
            >
              プロジェクトを作成する
            </Button>
          </Tooltip>
        </Box>
      </form>
      <Link href="/">
        <a css={linkTitle}>&#65124; ホームに戻る</a>
      </Link>
    </Container>
  );
};

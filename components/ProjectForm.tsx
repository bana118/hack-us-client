import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  TextField,
  Tooltip,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  GetProjectQuery,
  LanguageInput,
  useCreateParticipantMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../types/graphql";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { css } from "@emotion/react";
import { GetUserQuery } from "../types/graphql";
import { LanguageColors } from "../utils/language-colors";

type ProjectFormProps = {
  user: GetUserQuery["user"];
  project?: GetProjectQuery["project"];
};

type InputsType = {
  name: string;
  description: string;
  githubUrl: string;
  startsAt: string;
  endsAt: string;
  language1: string;
  language2: string;
  language3: string;
  recruitmentNumbers: string;
  toolLink: string;
  contribution: string;
};

const container = css({
  backgroundColor: "#ffffff",
  padding: "40px 30px",
  borderRadius: "10px",
});

const subTitle = css({
  fontSize: "20px",
  fontWeight: "bold",
});

const languageWidth = css({
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

const defaultDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const date =
    today.getDate() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;

  return `${year}-${month}-${date}`;
};

const schema = yup.object().shape({
  name: yup.string().required("名前は必須です"),
  recruitmentNumbers: yup.number().min(1, "最低でも1人は募集してください"),
});

export const ProjectForm = ({
  user,
  project,
}: ProjectFormProps): JSX.Element => {
  const defaultValues: InputsType = {
    name: project !== undefined ? project.name : "",
    description: project !== undefined ? project.description : "",
    githubUrl: project !== undefined ? project.githubUrl : "",
    startsAt:
      project !== undefined ? project.startsAt.slice(0, 10) : defaultDate(),
    endsAt: project !== undefined ? project.endsAt.slice(0, 10) : defaultDate(),
    language1:
      project !== undefined && project?.languages.length >= 1
        ? JSON.stringify({
            name: project.languages[0]["name"],
            color: project.languages[0]["color"],
          })
        : "",
    language2:
      project !== undefined && project?.languages.length >= 2
        ? JSON.stringify({
            name: project.languages[1]["name"],
            color: project.languages[1]["color"],
          })
        : "",
    language3:
      project !== undefined && project?.languages.length === 3
        ? JSON.stringify({
            name: project.languages[2]["name"],
            color: project.languages[2]["color"],
          })
        : "",
    recruitmentNumbers:
      project?.recruitmentNumbers !== undefined &&
      project?.recruitmentNumbers !== null
        ? project.recruitmentNumbers.toString()
        : "1",
    toolLink: project !== undefined ? project.toolLink : "",
    contribution: project !== undefined ? project.contribution : "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InputsType>({ defaultValues, resolver: yupResolver(schema) });

  const setUnexpectedError = () => {
    setError("name", {
      type: "manual",
      message: "予期せぬエラーが発生しました！ もう一度お試しください",
    });
  };

  const [updatedTooltipOpen, setUpdatedTooltipOpen] = useState(false);

  const [createProjectMutation] = useCreateProjectMutation();
  const [createParticipantMutation] = useCreateParticipantMutation();
  const [updateProjectMutation] = useUpdateProjectMutation();

  const createProject = async (data: InputsType) => {
    const languages: LanguageInput[] = [
      JSON.parse(data["language1"] || "null"),
      JSON.parse(data["language2"] || "null"),
      JSON.parse(data["language3"] || "null"),
    ];

    try {
      if (Router.pathname === "/create-project") {
        const result = await createProjectMutation({
          variables: {
            name: data["name"],
            description: data["description"],
            githubUrl: data["githubUrl"],
            startsAt: data["startsAt"],
            endsAt: data["endsAt"],
            languages: languages,
            recruitmentNumbers: parseInt(data["recruitmentNumbers"], 10),
            toolLink: data["toolLink"],
            contribution: data["contribution"],
            ownerUid: user.uid,
          },
        });

        const projectId = result.data?.createProject?.project?.id;

        if (projectId !== undefined) {
          await createParticipantMutation({
            variables: {
              uid: user.uid,
              projectId: projectId,
              ownerApproved: true,
              userApproved: true,
            },
          });
        }
      } else if (
        Router.pathname === "/edit-project" &&
        project?.id !== undefined
      ) {
        await updateProjectMutation({
          variables: {
            id: project.id,
            name: data["name"],
            description: data["description"],
            githubUrl: data["githubUrl"],
            startsAt: data["startsAt"],
            endsAt: data["endsAt"],
            languages: languages,
            recruitmentNumbers: parseInt(data["recruitmentNumbers"], 10),
            toolLink: data["toolLink"],
            contribution: data["contribution"],
          },
        });
      }

      setUpdatedTooltipOpen(true);
      // TODO プロジェクト詳細ページに遷移
      Router.push("/");
    } catch (err) {
      setUnexpectedError();
    }
  };

  return (
    <Container css={container}>
      <form onSubmit={handleSubmit(createProject)}>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト名</h2>
          <Controller
            name="name"
            control={control}
            defaultValue={defaultValues.name}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>プロジェクト概要</h2>
          <Controller
            name="description"
            control={control}
            defaultValue={defaultValues.description}
            render={({ field }) => (
              <TextField
                fullWidth
                multiline
                minRows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>GitHubリポジトリ</h2>
          <Controller
            name="githubUrl"
            control={control}
            defaultValue={defaultValues.githubUrl}
            render={({ field }) => (
              <TextField fullWidth variant="standard" {...field} />
            )}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>開発期間</h2>
          <Box display="flex">
            <Controller
              name="startsAt"
              control={control}
              defaultValue={defaultValues.startsAt}
              render={({ field }) => (
                <TextField
                  type="date"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...field}
                />
              )}
            />
            <span>&#8594;</span>
            <Controller
              name="endsAt"
              control={control}
              defaultValue={defaultValues.endsAt}
              render={({ field }) => (
                <TextField
                  type="date"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
        {/* TODO 使用言語の数を可変にする */}
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>使用言語</h2>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Controller
              name="language1"
              control={control}
              render={({ field }) => (
                <Select css={languageWidth} variant="standard" {...field}>
                  <MenuItem value="">なし</MenuItem>
                  {LanguageColors.map((languageColor, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={JSON.stringify(languageColor)}
                      >
                        {languageColor["name"]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            <Controller
              name="language2"
              control={control}
              render={({ field }) => (
                <Select css={languageWidth} variant="standard" {...field}>
                  <MenuItem value="">なし</MenuItem>
                  {LanguageColors.map((languageColor, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={JSON.stringify(languageColor)}
                      >
                        {languageColor["name"]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            <Controller
              name="language3"
              control={control}
              render={({ field }) => (
                <Select css={languageWidth} variant="standard" {...field}>
                  <MenuItem value="">なし</MenuItem>
                  {LanguageColors.map((languageColor, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={JSON.stringify(languageColor)}
                      >
                        {languageColor["name"]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </Box>
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>募集人数</h2>
          <Controller
            name="recruitmentNumbers"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                type="number"
                variant="standard"
                error={!!errors.recruitmentNumbers}
                helperText={errors.recruitmentNumbers?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>Discord or Slackのリンク</h2>
          <Controller
            name="toolLink"
            control={control}
            defaultValue={defaultValues.toolLink}
            render={({ field }) => (
              <TextField fullWidth variant="standard" {...field} />
            )}
          />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={12.5}>
          <h2 css={subTitle}>コントリビュートの方法</h2>
          <Controller
            name="contribution"
            control={control}
            defaultValue={defaultValues.contribution}
            render={({ field }) => (
              <TextField fullWidth variant="standard" {...field} />
            )}
          />
        </Box>
        <Box css={subTitle} width={300} sx={{ mx: "auto" }} mb={5}>
          <Tooltip
            title={project === undefined ? "作成しました！" : "編集しました！"}
            open={updatedTooltipOpen}
            onClose={() => {
              setUpdatedTooltipOpen(false);
            }}
          >
            <Button css={button} type="submit" variant="contained">
              {project === undefined
                ? "プロジェクトを作成する"
                : "プロジェクトを編集する"}
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

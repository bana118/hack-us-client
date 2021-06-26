import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Container, TextField, Tooltip } from "@material-ui/core";
import nookies from "nookies";
import { uidKeyName } from "../utils/cookie-key-names";
import { useCreateProjectMutation } from "../types/graphql";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { css } from "@emotion/react";

type InputsType = {
  name: string;
  description: string;
  githubUrl: string;
  startsAt: string;
  endsAt: string;
  technology1: string;
  technology2: string;
  technology3: string;
  technology4: string;
  technology5: string;
  recruitmentNumbers: string;
  toolLink: string;
  contribution: string;
};

const defaultDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${month}-${date}`;
};

const defaultValues: InputsType = {
  name: "",
  description: "",
  githubUrl: "",
  startsAt: defaultDate(),
  endsAt: defaultDate(),
  technology1: "",
  technology2: "",
  technology3: "",
  technology4: "",
  technology5: "",
  recruitmentNumbers: "1",
  toolLink: "",
  contribution: "",
};

const schema = yup.object().shape({
  name: yup.string().required("名前は必須です"),
  recruitmentNumbers: yup.number().min(1, "最低でも1人は募集してください"),
});

export const ProjectForm = (): JSX.Element => {
  const router = useRouter();

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

  const cookies = nookies.get();
  const uid = cookies[uidKeyName];

  const [updatedTooltipOpen, setUpdatedTooltipOpen] = useState(false);

  const [createProjectMutation] = useCreateProjectMutation();

  const createProject = async (data: InputsType) => {
    try {
      await createProjectMutation({
        variables: {
          name: data["name"],
          description: data["description"],
          githubUrl: data["githubUrl"],
          startsAt: data["startsAt"],
          endsAt: data["endsAt"],
          technology1: data["technology1"],
          technology2: data["technology2"],
          technology3: data["technology3"],
          technology4: data["technology4"],
          technology5: data["technology5"],
          recruitmentNumbers: parseInt(data["recruitmentNumbers"], 10),
          toolLink: data["toolLink"],
          contribution: data["contribution"],
          ownerUid: uid,
        },
      });
      setUpdatedTooltipOpen(true);
      router.push("/");
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
        <Box width={300} sx={{ mx: "auto" }} mb={2.5}>
          <h2 css={subTitle}>使用技術</h2>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Controller
              name="technology1"
              control={control}
              render={({ field }) => (
                <TextField css={tecnologyWidth} variant="standard" {...field} />
              )}
            />
            <Controller
              name="technology2"
              control={control}
              render={({ field }) => (
                <TextField css={tecnologyWidth} variant="standard" {...field} />
              )}
            />
            <Controller
              name="technology3"
              control={control}
              render={({ field }) => (
                <TextField css={tecnologyWidth} variant="standard" {...field} />
              )}
            />
            <Controller
              name="technology4"
              control={control}
              render={({ field }) => (
                <TextField css={tecnologyWidth} variant="standard" {...field} />
              )}
            />
            <Controller
              name="technology5"
              control={control}
              render={({ field }) => (
                <TextField css={tecnologyWidth} variant="standard" {...field} />
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
          <TextField fullWidth variant="standard" />
        </Box>
        <Box width={300} sx={{ mx: "auto" }} mb={12.5}>
          <h2 css={subTitle}>コントリビュートの方法</h2>
          <Controller
            name="contribution"
            control={control}
            render={({ field }) => (
              <TextField fullWidth variant="standard" {...field} />
            )}
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
            <Button css={button} type="submit" variant="contained">
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

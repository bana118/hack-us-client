import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Grid, Avatar } from "@material-ui/core";
import MuiTooltip from "@material-ui/core/Tooltip";
import { GetUserQuery, useUpdateUserMutation } from "../types/graphql";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ContributionPieChart } from "./ContributionPieChart";
import { css } from "@emotion/react";
import { themeMain, textLinkblue } from "../utils/style-variables";

type ProfileFormProps = {
  user: GetUserQuery["user"];
};

type InputsType = {
  name: string;
  description: string;
};

const container = css({
  backgroundColor: "#ffffff",
  margin: "30px 0",
  padding: 50,
  borderRadius: "10px",
});

const button = css`
  background-color: ${themeMain};
`;

const linkTitle = css({
  color: textLinkblue,
  cursor: "pointer",
});

const schema = yup.object().shape({
  name: yup.string().max(20, "名前は20文字までです").required("名前は必須です"),
  description: yup.string().max(100, "プロフィールは100文字までです"),
});

export const ProfileForm = ({ user }: ProfileFormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InputsType>({ resolver: yupResolver(schema) });

  const setUnexpectedError = () => {
    setError("name", {
      type: "manual",
      message: "予期せぬエラーが発生しました！ もう一度お試しください",
    });
  };

  const [updateUserMutation] = useUpdateUserMutation();

  const [updatedTooltipOpen, setUpdatedTooltipOpen] = useState(false);

  const updateProfile = async (data: InputsType) => {
    try {
      await updateUserMutation({
        variables: {
          uid: user.uid,
          name: data["name"],
          description: data["description"],
        },
      });
      setUpdatedTooltipOpen(true);
    } catch {
      setUnexpectedError();
    }
  };

  // TODO 連携Githubアカウント変更
  // TODO アカウント削除処理
  // TODO プロジェクト表示機能
  return (
    <Grid css={container}>
      <form onSubmit={handleSubmit(updateProfile)}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <h1>あなたのプロフィール</h1>
          </Grid>
          <Grid item>
            <Box borderRadius={50} border={1} borderColor={themeMain}>
              <Avatar
                css={{
                  width: 120,
                  height: 120,
                }}
              >
                <Image
                  src={user.githubIconUrl}
                  alt="Github Icon"
                  layout="fill"
                />
              </Avatar>
            </Box>
          </Grid>
          <Grid item>
            <p>
              Githubアカウント:{" "}
              <Link href={`https://github.com/${user.githubId}`}>
                <a css={linkTitle}>{user.githubId}</a>
              </Link>
            </p>
          </Grid>
          <Grid item textAlign="center">
            <p>言語別コントリビューション</p>
            {/* TODO SSR時のChart表示に関するWarningがでる */}
            <ContributionPieChart contributions={user.contributions} />
          </Grid>
          <Grid item>
            <Controller
              name="name"
              control={control}
              defaultValue={user.name}
              render={({ field }) => (
                <TextField
                  label="名前（ニックネーム）"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item css={{ margin: 20 }}>
            <Controller
              name="description"
              control={control}
              defaultValue={user.description}
              render={({ field }) => (
                <TextField
                  label="自己紹介"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  multiline
                  minRows={5}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item>
            <MuiTooltip
              title="更新しました！"
              open={updatedTooltipOpen}
              onClose={() => {
                setUpdatedTooltipOpen(false);
              }}
            >
              <Button css={button} variant="contained" type="submit">
                更新する
              </Button>
            </MuiTooltip>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

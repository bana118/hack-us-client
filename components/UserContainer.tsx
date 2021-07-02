import {
  Grid,
  Avatar,
  Link,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  GetMeAndUserQuery,
  useCreateParticipantMutation,
} from "../types/graphql";
import { ContributionPieChart } from "./ContributionPieChart";
import Image from "next/image";
import { useState } from "react";

type UserContaienrProps = {
  me: GetMeAndUserQuery["me"] | null;
  user: GetMeAndUserQuery["user"];
  userParticipants: GetMeAndUserQuery["userParticipants"]["nodes"];
};

export const UserContainer = ({
  me,
  user,
  userParticipants,
}: UserContaienrProps): JSX.Element => {
  const [createParticipantMutation] = useCreateParticipantMutation();
  const [scoutProjectId, setScoutProjectId] = useState("");
  const [participantProjectIds, setParticipantProjectIds] = useState(
    userParticipants != null
      ? userParticipants.map((userParticipant) => userParticipant?.project.id)
      : []
  );
  const availableScout = (projectId: string): boolean => {
    if (projectId === "") return false;
    return !participantProjectIds.some((id) => id === projectId);
  };
  const scout = async () => {
    if (scoutProjectId === "") return;
    try {
      await createParticipantMutation({
        variables: {
          uid: user.uid,
          projectId: scoutProjectId,
          // TODO userApproved はfalseにして承認待ちにする
          ownerApproved: true,
          userApproved: true,
        },
      });
      setParticipantProjectIds([scoutProjectId, ...participantProjectIds]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <h1>{user.name}のプロフィール</h1>
      </Grid>
      <Grid item>
        <Avatar
          css={{
            width: 120,
            height: 120,
          }}
        >
          <Image src={user.githubIconUrl} alt="Github Icon" layout="fill" />
        </Avatar>
      </Grid>
      <Grid item>
        <p>
          Githubアカウント:{" "}
          <Link href={`https://github.com/${user.githubId}`}>
            <a>{user.githubId}</a>
          </Link>
        </p>
      </Grid>
      <Grid item textAlign="center">
        <p>言語別コントリビューション</p>
        {/* TODO SSR時のChart表示に関するWarningがでる */}
        <ContributionPieChart contributions={user.contributions} />
      </Grid>
      <Grid item>
        <p>自己紹介: {user.description}</p>
      </Grid>
      {me && me.uid !== user.uid && (
        <Grid item>
          <h2>自分のプロジェクトにスカウト</h2>
          プロジェクト:{" "}
          <Select
            variant="standard"
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setScoutProjectId(event.target.value as string)
            }
          >
            <MenuItem value=""></MenuItem>
            {me?.projects &&
              me.projects.map((project, index) => {
                return (
                  <MenuItem key={index} value={project.id}>
                    {project.name}
                  </MenuItem>
                );
              })}
          </Select>
          に
          {scoutProjectId !== "" && availableScout(scoutProjectId) && (
            <Button type="submit" variant="contained" onClick={scout}>
              スカウトする！
            </Button>
          )}
          {scoutProjectId !== "" && !availableScout(scoutProjectId) && (
            <Button type="submit" variant="contained" onClick={scout} disabled>
              参加済みです
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  );
};

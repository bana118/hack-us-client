import {
  Grid,
  Avatar,
  Link,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { GetMeAndUserQuery } from "../types/graphql";
import { ContributionPieChart } from "./ContributionPieChart";
import Image from "next/image";

type UserContaienrProps = {
  me: GetMeAndUserQuery["me"];
  user: GetMeAndUserQuery["user"];
};

export const UserContainer = ({
  me,
  user,
}: UserContaienrProps): JSX.Element => {
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
      <Grid item>
        プロジェクト:{" "}
        <Select variant="standard">
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
        <Button type="submit" variant="contained">
          スカウトする！
        </Button>
      </Grid>
    </Grid>
  );
};

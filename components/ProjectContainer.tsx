import { css } from "@emotion/react";
import { Container, Button } from "@material-ui/core";
import { LanguageInput } from "../types/graphql";
import { Project } from "../types/graphql";
import { useRouter } from "next/router";

const projectStyle = css`
  background-color: #ffffff;
  width: 400px;
  height: 150px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const projectNameStyle = css`
  font-size: 1.5em;
  padding-top: 20px;
  padding-left: 20px;
  margin-top: 0;
`;

const projectDetailStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const projectLanguageStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const projectStatusStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

type ProjectContainerProps = {
  name?: string;
  description?: string;
  languages?: LanguageInput[];
  startsAt?: string | null;
  endsAt?: string | null;
  contribution?: string | null;
  id?: string | null;
  recruitmentNumbers?: number | undefined;
};

export const ProjectContainer = ({
  name = "Default Name",
  description = "Default Description",
  languages = [],
  startsAt = null,
  endsAt = null,
  contribution = null,
  recruitmentNumbers = 0,
}: ProjectContainerProps): JSX.Element => {
  const router = useRouter();

  const handleClick = (): void => {
    router.push({
      pathname: "/project/[pid]",
      // pathname: "../pages/index",
      query: {
        contribution: contribution,
        name: name,
        description: description,
        // githubUrl: githubUrl,
        recruitmentNumbers: recruitmentNumbers,
        // toolLink: toolLink,
        // languages: languages,
        // updatedAt: updatedAt,
        // createdAt: createdAt,
        startsAt: startsAt,
        endsAt: endsAt,
        // owner: owner.name,
      },
    });
  };
  // TODO 開発ステータスの追加
  // TODO お気に入り機能の追加
  // TODO descriptionを適当な文字数で切る
  return (
    <Button css={projectStyle} onClick={handleClick}>
      <p css={projectNameStyle}>{name}</p>
      <p css={projectDetailStyle}>{description}</p>
      <p css={projectLanguageStyle}>
        言語:{" "}
        {languages.map((language, index) => {
          if (index == languages.length - 1)
            return (
              <span key={index} css={{ color: language.color }}>
                {language.name}
              </span>
            );
          return (
            <span key={index} css={{ color: language.color }}>
              {language.name},{" "}
            </span>
          );
        })}
      </p>
      {startsAt && endsAt && (
        <p css={projectStatusStyle}>
          {new Date(startsAt).toLocaleDateString()}～
          {new Date(endsAt).toLocaleDateString()}
        </p>
      )}
    </Button>
  );
};

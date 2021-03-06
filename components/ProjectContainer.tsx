import Link from "next/link";
import { css } from "@emotion/react";
import { Container, Button } from "@material-ui/core";
import { LanguageInput } from "../types/graphql";
import { FavoriteButton } from "./FavoriteButton";

const container = css`
  background-color: #ffffff;
  width: 400px;
  height: 150px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-flow: row;
`;

const projectStyle = css`
  margin: 0;
  padding: 0;
  width: 100%;
  flex-flow: column;
  color: #000000;
  &:hover {
    background-color: transparent;
  }
`;

const projectNameStyle = css`
  text-transform: none;
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  margin-right: auto;
`;

const projectDetailStyle = css`
  text-transform: none;
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 3px;
  margin-right: auto;
`;

const projectLanguageStyle = css`
  text-transform: none;
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 3px;
  margin-right: auto;
`;

const projectStatusStyle = css`
  text-transform: none;
  font-size: 14px;
  margin: 0px;
  margin-right: auto;
  margin-right: auto;
`;

type ProjectContainerProps = {
  id?: string;
  uid?: string;
  favorite?: boolean | undefined;
  name?: string;
  description?: string;
  languages?: LanguageInput[] | null;
  startsAt?: string | null;
  endsAt?: string | null;
  contribution?: string | null;
  recruitmentNumbers?: number | null;
};

export const ProjectContainer = ({
  id = "",
  uid = "",
  favorite = false,
  name = "Default Name",
  description = "Default Description",
  languages = [],
  startsAt = null,
  endsAt = null,
}: ProjectContainerProps): JSX.Element => {
  // TODO 開発ステータスの追加
  // TODO descriptionを適当な文字数で切る
  return (
    <Container css={container}>
      <Link
        as={"/project/" + id}
        href={{ pathname: "/project/[id]", query: { id: id } }}
        passHref
      >
        {/* <ProjectDisplay ref={ref} /> */}
        <Button css={projectStyle}>
          <p css={projectNameStyle}>{name}</p>
          <p css={projectDetailStyle}>{description}</p>
          <p css={projectLanguageStyle}>
            言語:{" "}
            {languages &&
              languages.map((language, index) => {
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
                return (
                  <span key={index} css={{ color: language.color }}>
                    {language.name}{" "}
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
      </Link>
      <FavoriteButton id={id} uid={uid} favorite={favorite} />
    </Container>
  );
};

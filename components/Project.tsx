import { css } from "@emotion/react";
import { Button, Container } from "@material-ui/core";
import { Project } from "../types/graphql";
// import { Route } from "react-router-dom";
import { useRouter } from "next/router";
import link from "next/link";
import { AnyNsRecord } from "dns";

const projectStyle = css`
  display: flex;
  flex-flow: column;
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
  margin-right: auto;
`;

const projectDescriptionStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: auto;
`;

const projectLanguageStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: auto;
`;

const projectStatusStyle = css`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: auto;
`;

type ProjectCompProps = {
  project: Project;
};

export const ProjectComp = ({ project }: ProjectCompProps): JSX.Element => {
  const router = useRouter();

  // const languages: any[] = new Array(1);
  // project.languages.map((x, idx) => {
  //   languages.push([x.name, x.color]);
  // });

  const handleClick = (): void => {
    router.push({
      pathname: "/project/[pid]",
      // pathname: "../pages/index",
      query: {
        contribution: project.contribution,
        pid: project.id,
        name: project.name,
        description: project.description,
        githubUrl: project.githubUrl,
        recruitmentNumbers: project.recruitmentNumbers,
        toolLink: project.toolLink,
        // languages: languages,
        updatedAt: project.updatedAt,
        createdAt: project.createdAt,
        startsAt: project.startsAt,
        endsAt: project.endsAt,
        owner: project.owner.name,
      },
    });
  };

  return (
    <Button css={projectStyle} onClick={handleClick}>
      <p css={projectNameStyle}>{project.name}</p>
      <p css={projectDescriptionStyle}>{project.description}</p>
      {/* <p css={projectLanguageStyle}>{language}</p> */}
      {/* <p css={projectStatusStyle}>{status}</p> */}
    </Button>
  );
};

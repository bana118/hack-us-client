import { css } from "@emotion/react";
import React, { useState } from "react";
import { Button, Container } from "@material-ui/core";
import { Project } from "../types/graphql";
// import { Route } from "react-router-dom";
import { ProjectDetail } from "./ProjectDetail";
import { useRouter } from "next/router";

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

  const handleClick = (): void => {
    router.push({
      pathname: "../pages/project/[pid]",
      query: { pid: project.id },
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

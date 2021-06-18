import React from "react";
import { css } from "@emotion/react";
import { Project } from "../interfaces/Project";

const projectStyle = css`
  background-color: #ffffff;
  width: 400px;
  height: 150px;
`;

const projectNameStyle = css`
  font-size: 1.5em;
  padding-top: 20px;
  padding-left: 20px;
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

export const ProjectComp = ({
  id = "default",
  name = "default",
  detail = "default",
  language = "asembly",
  status = "default",
}: Project): JSX.Element => {
  return (
    <div css={projectStyle}>
      <p css={projectNameStyle}>{name}</p>
      <p css={projectDetailStyle}>{detail}</p>
      <p css={projectLanguageStyle}>{language}</p>
      <p css={projectStatusStyle}>{status}</p>
    </div>
  );
};

import { css } from "@emotion/react";
import { Button, Container } from "@material-ui/core";
import { Project } from "../types/graphql";

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

export const ProjectComp = ({
  name = "default",
  description = "default",
}: Project): JSX.Element => {
  return (
    <Button css={projectStyle}>
      <p css={projectNameStyle}>{name}</p>
      <p css={projectDescriptionStyle}>{description}</p>
      {/* <p css={projectLanguageStyle}>{language}</p> */}
      {/* <p css={projectStatusStyle}>{status}</p> */}
    </Button>
  );
};

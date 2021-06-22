import { css } from "@emotion/react";
import { Container } from "@material-ui/core";
import { Project } from "../interfaces/Project";

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

export const ProjectComp = ({
  id = "default",
  name = "default",
  detail = "default",
  language = "asembly",
  status = "default",
}: Project): JSX.Element => {
  return (
    <Container css={projectStyle}>
      <p css={projectNameStyle}>{name}</p>
      <p css={projectDetailStyle}>{detail}</p>
      <p css={projectLanguageStyle}>{language}</p>
      <p css={projectStatusStyle}>{status}</p>
    </Container>
  );
};

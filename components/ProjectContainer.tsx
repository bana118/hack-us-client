import { css } from "@emotion/react";
import { Container } from "@material-ui/core";
import { LanguageInput } from "../types/graphql";

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
  startsAt?: Date | null;
  endsAt?: Date | null;
};

export const ProjectContainer = ({
  name = "Default Name",
  description = "Default Description",
  languages = [],
  startsAt = null,
  endsAt = null,
}: ProjectContainerProps): JSX.Element => {
  return (
    <Container css={projectStyle}>
      <p css={projectNameStyle}>{name}</p>
      <p css={projectDetailStyle}>{description}</p>
      <p css={projectLanguageStyle}>{languages}</p>
      <p css={projectStatusStyle}>
        {startsAt}-{endsAt}
      </p>
    </Container>
  );
};

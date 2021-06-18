import React from "react";
import { css } from "@emotion/react";
import { Project } from "../interfaces/Project";

const style = css`
  background-color: #ffffff;
`;

export const ProjectComp = ({
  id = "default",
  name = "default",
  detail = "default",
  status = "default",
}: Project): JSX.Element => {
  return (
    <div css={style}>
      <p>{name}</p>
      <p>{detail}</p>
      <p>{status}</p>
    </div>
  );
};

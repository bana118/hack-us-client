import { css } from "@emotion/react";
import { Box, Container, IconButton } from "@material-ui/core";
import { Project } from "../interfaces/Project";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useCreateFavoriteMutation } from "../types/graphql";

const container = css`
  background-color: #ffffff;
  width: 400px;
  height: 150px;
  padding: 20px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  display: flex;
`;

const projectStyle = css`
  margin: 0;
  padding: 0;
`;

const projectNameStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
`;

const projectDetailStyle = css`
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const projectLanguageStyle = css`
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
`;

const projectStatusStyle = css`
  font-size: 14px;
  margin: 0px;
`;

export const ProjectComp = ({
  name = "default",
  detail = "default",
  language = "asembly",
  status = "default",
}: Project): JSX.Element => {
  // const [createFavoriteMutation] = useCreateFavoriteMutation();

  const clickFavorite = async () => {
    console.log("ClickFavorite");
  };

  return (
    <Container css={container}>
      <Container css={projectStyle}>
        <p css={projectNameStyle}>{name}</p>
        <p css={projectDetailStyle}>{detail}</p>
        <p css={projectLanguageStyle}>{language}</p>
        <p css={projectStatusStyle}>{status}</p>
      </Container>
      <Box>
        <IconButton onClick={clickFavorite}>
          <StarOutlineIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

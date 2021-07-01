import { useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useCreateFavoriteMutation } from "../types/graphql";

type FavoriteButtonProps = {
  id?: string;
  uid?: string;
  favorite: boolean | undefined;
};

export const FavoriteButton = ({
  id = "",
  uid = "",
  favorite = false,
}: FavoriteButtonProps): JSX.Element => {
  const [changeIcon, setChangeIcon] = useState(favorite);
  const [createFavoriteMutation] = useCreateFavoriteMutation();

  const clickFavorite = async () => {
    if (!favorite) {
      try {
        await createFavoriteMutation({
          variables: {
            uid: uid,
            projectId: id,
          },
        });
        setChangeIcon(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      // TODO deleteFavoriteMutationの実装
    }
  };

  return (
    <Box>
      <IconButton onClick={clickFavorite}>
        {changeIcon ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    </Box>
  );
};

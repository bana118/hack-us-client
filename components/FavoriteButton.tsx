import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
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
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);
  const userButtonRef = useRef(null);

  const router = useRouter();
  const currentpath: string = router.pathname;

  const [createFavoriteMutation] = useCreateFavoriteMutation();

  const clickEdit = (): void => {
    router.push({
      pathname: "/edit-project",
      query: {
        id: id,
      },
    });
  };

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
      } catch {
        return;
      }
    } else {
      // TODO deleteFavoriteMutationの実装
    }
  };

  return (
    <Box>
      {currentpath === "/my-project" ? (
        <React.Fragment>
          <IconButton
            ref={userButtonRef}
            onClick={() => setUserPopoverOpen(true)}
          >
            <MoreHorizIcon />
          </IconButton>
          <Popover
            open={userPopoverOpen}
            anchorEl={userButtonRef.current}
            onClose={() => setUserPopoverOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List>
              <ListItem button onClick={clickEdit}>
                <ListItemText primary="プロジェクトの編集" />
              </ListItem>
              {/* <ListItem button>
                <ListItemText
                  style={{ color: "red" }}
                  primary="プロジェクトの削除"
                />
              </ListItem> */}
            </List>
          </Popover>
        </React.Fragment>
      ) : (
        <IconButton onClick={clickFavorite}>
          {changeIcon ? <StarIcon /> : <StarOutlineIcon />}
        </IconButton>
      )}
    </Box>
  );
};

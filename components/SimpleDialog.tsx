import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { GithubLoginButton } from "react-social-login-buttons";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const LoginDialog = ({
  open,
  onClose,
}: LoginDialogProps): JSX.Element => {
  return (
    <Dialog onClose={onClose} aria-labelledby="login-dialog-title" open={open}>
      <DialogTitle id="login-dialog-title">
        Hack Us
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Githubアカウントでログインできます
        </DialogContentText>
        <GithubLoginButton />
      </DialogContent>
    </Dialog>
  );
};

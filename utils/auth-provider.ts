import "firebase/auth";
import firebase from "firebase/app";
import { auth } from "./firebase";

export const getProviderUserData = (
  u: firebase.User,
  providerId: "github"
): firebase.UserInfo | null => {
  const userInfoList = u.providerData;
  const providerUserData = userInfoList.find(
    (userInfo) => userInfo != null && userInfo.providerId === providerId
  );
  if (providerUserData == null) return null;
  return providerUserData;
};

export const loginWithGithub = async (): Promise<void> => {
  try {
    const provider = new firebase.auth.GithubAuthProvider();
    await auth.signInWithRedirect(provider);
  } catch {
    console.error("Unexpected Error");
  }
};

export const linkWithGoogle = async (
  authUser: firebase.User
): Promise<void> => {
  try {
    const provider = new firebase.auth.GithubAuthProvider();
    await authUser.linkWithRedirect(provider);
  } catch {
    console.error("Unexpected Error");
  }
};

export const storeUserfromLoginResult = async (): Promise<void> => {
  try {
    const result = await auth.getRedirectResult();
    if (
      result.credential &&
      result.user &&
      result.additionalUserInfo?.isNewUser
    ) {
      const authUser = result.user;
      // TODO サーバーにユーザーデータを送信
      console.log(authUser);
    }
  } catch (error) {
    console.error(error);
  }
};

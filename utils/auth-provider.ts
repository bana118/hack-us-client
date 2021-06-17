import "firebase/auth";
import firebase from "firebase/app";
import { auth } from "./firebase";
import { apolloClient } from "./apollo-client";
import { CREATE_USER } from "../interfaces/User";
import { CreateUserMutationVariables, User } from "../types/graphql";

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

export const createUserfromLoginResult = async (): Promise<void> => {
  try {
    const result = await auth.getRedirectResult();
    if (
      result.credential &&
      result.user &&
      result.additionalUserInfo?.isNewUser
    ) {
      const authUser = result.user;
      // TODO Fix CORS Error
      // TODO ref: https://www.apollographql.com/docs/react/networking/authentication/
      const { data } = await apolloClient.mutate<
        User,
        CreateUserMutationVariables
      >({
        mutation: CREATE_USER,
        variables: { name: authUser.displayName, uid: authUser.uid },
      });
      console.log(data);
    }
    console.log("hoge");
  } catch (error) {
    console.error(error);
  }
};

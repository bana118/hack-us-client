import { createContext } from "react";
import firebase from "firebase/app";
import { GetUserQuery } from "../types/graphql";

export const AuthContext = createContext<{
  authUser?: firebase.User | null;
  user?: GetUserQuery["user"] | null;
}>({});

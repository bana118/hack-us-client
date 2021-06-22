import { createContext } from "react";
import firebase from "firebase/app";

// TODO firebase.UserではなくUserをcontextに入れた方がいいかもしれない
export const AuthContext = createContext<{
  authUser?: firebase.User | null;
}>({});

import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      uid
    }
  }
`;

export const GET_USER = gql`
  query GetUser($uid: String!) {
    user(uid: $uid) {
      name
      uid
      description
      githubId
      githubIconUrl
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String!, $githubId: String!) {
    createUser(input: { uid: $uid, githubId: $githubId }) {
      user {
        id
        name
        uid
      }
    }
  }
`;

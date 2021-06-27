import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      nodes {
        id
        name
        uid
      }
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
      contributionInfo {
        language
        color
        contributions
      }
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

export const UPDATE_USER = gql`
  mutation UpdateUser($uid: String!, $name: String!, $description: String!) {
    updateUser(input: { uid: $uid, name: $name, description: $description }) {
      user {
        id
        name
        uid
      }
    }
  }
`;

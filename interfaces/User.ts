import { gql } from "@apollo/client";

export const GET_RECOMMEND_USERS = gql`
  query GetRecommendUsers(
    $first: Int!
    $language1: String
    $language2: String
    $language3: String
  ) {
    language1: users(language: $language1, first: $first) {
      nodes {
        id
        name
        uid
        githubIconUrl
      }
    }
    language2: users(language: $language2, first: $first) {
      nodes {
        id
        name
        uid
        githubIconUrl
      }
    }
    language3: users(language: $language3, first: $first) {
      nodes {
        id
        name
        uid
        githubIconUrl
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($uid: String!) {
    user(uid: $uid) {
      id
      name
      uid
      description
      githubId
      githubIconUrl
      contributions {
        language
        color
        count
      }
      projects {
        id
        name
      }
    }
  }
`;

export const GET_ME_AND_USER = gql`
  query GetMeAndUser($myUid: String!, $uid: String!) {
    me: user(uid: $myUid) {
      id
      name
      uid
      description
      githubId
      githubIconUrl
      contributions {
        language
        color
        count
      }
      projects {
        id
        name
      }
    }
    user(uid: $uid) {
      id
      name
      uid
      description
      githubId
      githubIconUrl
      contributions {
        language
        color
        count
      }
      projects {
        id
        name
      }
    }
    userParticipants(uid: $uid) {
      nodes {
        project {
          id
        }
      }
    }
  }
`;

export const GET_PROJECT_PARTICIPANTS = gql`
  query GetProjectParticipants($projectId: ID!) {
    projectParticipants(projectId: $projectId) {
      nodes {
        user {
          id
          name
          uid
          description
          githubId
          githubIconUrl
          contributions {
            language
            color
            count
          }
        }
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

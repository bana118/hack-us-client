import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      nodes {
        id
        name
        description
        startsAt
        endsAt
        languages {
          name
          color
        }
        recruitmentNumbers
        toolLink
        contribution
        owner {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String
    $githubUrl: String
    $startsAt: ISO8601DateTime
    $endsAt: ISO8601DateTime
    $languages: [LanguageInput!]
    $recruitmentNumbers: Int
    $toolLink: String
    $contribution: String
    $ownerId: Int!
  ) {
    createProject(
      input: {
        name: $name
        description: $description
        githubUrl: $githubUrl
        startsAt: $startsAt
        endsAt: $endsAt
        languages: $languages
        recruitmentNumbers: $recruitmentNumbers
        toolLink: $toolLink
        contribution: $contribution
        ownerId: $ownerId
      }
    ) {
      project {
        id
        name
        description
        startsAt
        endsAt
        languages {
          name
          color
        }
        recruitmentNumbers
        toolLink
        contribution
        owner {
          id
          name
        }
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      githubUrl
      startsAt
      endsAt
      languages {
        name
        color
      }
      recruitmentNumbers
      toolLink
      contribution
    }
  }
`;

export const GET_USER_PARTICIPANTS = gql`
  query GetUserParticipants($uid: String!) {
    userParticipants(uid: $uid) {
      nodes {
        id
        project {
          id
          name
        }
      }
    }
  }
`;

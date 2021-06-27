import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects(
    $uid: String!
    $projectsFirst: Int!
    $userParticipantsFirst: Int!
    $userFavoritsFirst: Int!
  ) {
    projects(first: $projectsFirst) {
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
    userParticipants(uid: $uid, first: $userParticipantsFirst) {
      nodes {
        id
        project {
          id
          name
        }
      }
    }
    userFavorites(uid: $uid, first: $userFavoritsFirst) {
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
    $ownerUid: String!
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
        ownerUid: $ownerUid
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

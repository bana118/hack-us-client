import { gql } from "@apollo/client";

export type Project = {
  id?: string;
  name?: string;
  detail?: string;
  language?: string;
  status?: string;
};

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

// export const GET_PROJECT = gql`
//   query GetProject($id: String!) {
//       project(id: $id) {
//           id
//           name
//           detail
//           language
//           status
//       }
//   }
// `;

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

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($uid: String!, $projectId: ID!) {
    createFavorite(input: { uid: $uid, projectId: $projectId }) {
      favorite {
        id
        user {
          id
        }
        project {
          id
        }
      }
    }
  }
`;

// export const DELETE_FAVORITE = gql`
//   mutation DeleteFavorite($id: ID!) {
//     deleteFavorite(input: { id: $id }) {
//       favorite {
//         id
//         user {
//           id
//         }
//         project {
//           id
//         }
//       }
//     }
//   }
// `;

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
      }
    }
    userParticipants(uid: $uid, first: $userParticipantsFirst) {
      nodes {
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
        }
      }
    }
    userFavorites(uid: $uid, first: $userFavoritsFirst) {
      nodes {
        id
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
        }
      }
    }
  }
`;

export const GET_MY_PROJECTS = gql`
  query GetMyProjects($uid: String!) {
    userParticipants(uid: $uid) {
      nodes {
        project {
          id
          name
          owner {
            uid
          }
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
        }
      }
    }
    userFavorites(uid: $uid) {
      nodes {
        project {
          id
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

export const CREATE_PARTICIPANT = gql`
  mutation CreateParticipant($uid: String!, $projectId: ID!) {
    createParticipant(input: { uid: $uid, projectId: $projectId }) {
      participant {
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

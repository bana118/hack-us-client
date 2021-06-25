export type Project = {
  id?: string;
  name?: string;
  detail?: string;
  language?: string;
  status?: string;
};

import { gql } from "@apollo/client";

export const GET_USER_PARTICIPANTS = gql`
  query GetUserParticipants($uid: String!) {
    userParticipants(uid: $uid) {
      id
      project {
        id
        name
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

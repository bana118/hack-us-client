import { gql } from "@apollo/client";

export const GET_USER_PARTICIPANTS = gql`
  query GetUserParticipants($uid: String!) {
    userParticipants(uid: $uid) {
      id
      project {
        id
        name
        description
        githubUrl
        startsAt
        endsAt
        technology1
        technology2
        technology3
        technology4
        technology5
        recruitmentNumbers
        toolLink
        contribution
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
      technology1
      technology2
      technology3
      technology4
      technology5
      recruitmentNumbers
      toolLink
      contribution
    }
  }
`;

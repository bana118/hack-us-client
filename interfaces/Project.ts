import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String
    $githubUrl: String
    $startsAt: ISO8601DateTime
    $endsAt: ISO8601DateTime
    $technology1: String
    $technology2: String
    $technology3: String
    $technology4: String
    $technology5: String
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
        technology1: $technology1
        technology2: $technology2
        technology3: $technology3
        technology4: $technology4
        technology5: $technology5
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
        technology1
        technology2
        technology3
        technology4
        technology5
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

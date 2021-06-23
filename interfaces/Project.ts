export type Project = {
  id?: string;
  name?: string;
  detail?: string;
  language?: string;
  status?: string;
};

import { gql } from "@apollo/client";

export const GET_USER_PARTICIPANTS = gql`
  query GetUserParticipants($uid: string!) {
    id
    project {
      id
      name
    }
  }
`;

// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
import { gql } from "@apollo/client";

// TODO Graphqlの型はcodegenなどで自動生成
export type User = {
  id: string;
  name: string;
};

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

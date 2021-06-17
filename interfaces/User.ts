import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $uid: String!) {
    createUser(input: { name: $name, uid: $uid }) {
      user {
        id
        name
        uid
      }
    }
  }
`;

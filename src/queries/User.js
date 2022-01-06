import { gql } from "@apollo/client/core";

export const SIGNUP = gql`
  mutation ($email: String!, $password: String!, $username: String!) {
    Signup(
      credentials: { email: $email, password: $password, username: $username }
    ) {
      email
      id
      password
      token
      user_name
    }
  }
`;

export const LOGIN = gql`
  query ($email: String!, $password: String!) {
    login(credientials: { email: $email, password: $password }) {
      email
      password
      id
      token
      user_name
    }
  }
`;

export const GET_USER = gql`
  query ($userId: uuid!) {
    Users_by_pk(id: $userId) {
      id
      email
      path
      user_name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($userId: uuid!, $email: String!, $userName: String!) {
    update_Users_by_pk(
      pk_columns: { id: $userId }
      _set: { email: $email, user_name: $userName }
    ) {
      id
      user_name
      email
      path
    }
  }
`;

export const UPDATE_USER_IMAGE = gql`
  mutation ($userId: uuid!, $path: String!) {
    update_Users_by_pk(pk_columns: { id: $userId }, _set: { path: $path }) {
      id
    }
  }
`;
